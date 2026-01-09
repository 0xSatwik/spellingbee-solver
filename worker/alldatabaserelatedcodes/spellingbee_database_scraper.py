import requests
from bs4 import BeautifulSoup
import re
import os
import sqlite3
import time
import random
import concurrent.futures
from tqdm import tqdm
import logging
from datetime import datetime
import sys

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log"),
        logging.StreamHandler(sys.stdout)
    ]
)

# Database setup
def setup_database(db_path="spelling_bee.db"):
    """
    Create SQLite database and tables if they don't exist
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create puzzles table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS puzzles (
        id INTEGER PRIMARY KEY,
        puzzle_id INTEGER UNIQUE,
        date TEXT,
        word_count INTEGER,
        pangrams_count INTEGER,
        letters TEXT,
        other_letters TEXT,
        all_letters TEXT
    )
    ''')
    
    # Create words table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY,
        puzzle_id INTEGER,
        word TEXT,
        is_pangram INTEGER,
        length INTEGER,
        FOREIGN KEY (puzzle_id) REFERENCES puzzles(puzzle_id),
        UNIQUE(puzzle_id, word)
    )
    ''')
    
    conn.commit()
    conn.close()
    logging.info(f"Database set up at {db_path}")
    return db_path

def scrape_spelling_bee(puzzle_id, url=None, timeout=30, max_retries=3):
    """
    Scrape Spelling Bee answers from a URL
    """
    if url is None:
        url = f"https://www.sbsolver.com/s/{puzzle_id}"
    
    # Add retry logic
    retries = 0
    while retries < max_retries:
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()  # Raise exception for 4XX/5XX responses
            content = response.text
            break
        except (requests.RequestException, requests.Timeout) as e:
            retries += 1
            if retries < max_retries:
                wait_time = 2 ** retries  # Exponential backoff
                logging.warning(f"Error fetching puzzle {puzzle_id}, retry {retries}/{max_retries} in {wait_time}s: {e}")
                time.sleep(wait_time)
            else:
                logging.error(f"Failed to fetch puzzle {puzzle_id} after {max_retries} attempts: {e}")
                return None
    
    try:
        # Parse HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Check if page has valid content
        if soup.select_one('span.bee-date.bee-loud.bee-hover') is None:
            logging.warning(f"Puzzle {puzzle_id} page doesn't have expected content. It may not exist.")
            return None
        
        # Extract date
        date_element = soup.select_one('span.bee-date.bee-loud.bee-hover')
        date_text = date_element.text if date_element else "Unknown Date"
        date_match = re.search(r'Spelling Bee for (.+)', date_text)
        date = date_match.group(1).strip() if date_match else date_text
        
        # Extract word count
        word_count_element = soup.find('b', string=re.compile(r'words:'))
        word_count = 0
        if word_count_element and word_count_element.next_sibling:
            word_count_text = word_count_element.next_sibling.strip()
            try:
                word_count = int(word_count_text)
            except ValueError:
                pass

        # Extract pangrams count
        pangrams_element = soup.find('b', string=re.compile(r'pangrams:'))
        pangrams_count = 0
        if pangrams_element and pangrams_element.next_sibling:
            pangrams_count_text = pangrams_element.next_sibling.strip()
            try:
                pangrams_count = int(pangrams_count_text)
            except ValueError:
                pass
        
        # Best method: Get letters from the input field value (this is most reliable)
        letters = ""
        center_letter = ""
        input_elem = soup.select_one('input#string[value]')
        if input_elem and input_elem.get('value'):
            letters_string = input_elem.get('value')
            for char in letters_string:
                if char.isalpha():
                    if char.isupper():
                        center_letter = char
                    letters += char.upper()
        
        # If that fails, try to get from form hidden fields
        if not letters:
            checktext_elem = soup.select_one('input#checktext[value]')
            if checktext_elem and checktext_elem.get('value'):
                letters = checktext_elem.get('value').upper()
                # Find center letter (typically uppercase in the value)
                for char in letters:
                    if char.isupper():
                        center_letter = char
                        break
        
        # If still no letters, try other methods
        if not letters:
            # Try to find letters from the bee-day-nav section links
            for link in soup.select('div.bee-group.bee-silent a'):
                href = link.get('href', '')
                match = re.search(r'/[a-z]/([A-Za-z]+)$', href)
                if match:
                    letters_found = match.group(1).upper()
                    if len(letters_found) >= len(letters):
                        letters = letters_found
        
        # Final attempt: look for the bold word which is often the pangram
        if not letters or len(letters) < 7:
            bold_word = soup.find('b', string=lambda text: text and text.isupper() and len(text) > 3)
            if bold_word:
                # The pangram contains all 7 letters
                pangram = bold_word.text.strip()
                letters = ''.join(sorted(set(pangram.upper())))
        
        # Get other letters (letters excluding center letter)
        other_letters = ""
        if center_letter and letters:
            for char in letters:
                if char.upper() != center_letter.upper():
                    other_letters += char
                    
        # Extract pangram word(s)
        pangram_words = []
        
        # Try to find pangrams marked in the table
        for tr in soup.select('table.bee-set tr'):
            if tr.select_one('td.bee-note') and 'pangram' in tr.select_one('td.bee-note').text.lower():
                word_cell = tr.select_one('td.bee-hover a')
                if word_cell:
                    pangram_words.append(word_cell.text.strip())
        
        # If no pangrams found in table, try the bold word which is often the pangram
        if not pangram_words:
            bold_word = soup.find('b', string=lambda text: text and text.isupper() and len(text) > 3)
            if bold_word:
                pangram_words.append(bold_word.text.strip())
        
        # Extract all words
        all_words = []
        for tr in soup.select('table.bee-set tr'):
            if tr.select_one('td.bee-hover a'):
                word = tr.select_one('td.bee-hover a').text.strip()
                all_words.append(word)
        
        # Prepare results
        puzzle_data = {
            'puzzle_id': puzzle_id,
            'date': date,
            'word_count': word_count,
            'pangrams_count': pangrams_count,
            'letters': center_letter,
            'other_letters': other_letters,
            'all_letters': letters
        }
        
        # Prepare words data
        words_data = []
        for word in all_words:
            is_pangram = word.upper() in [p.upper() for p in pangram_words]
            words_data.append({
                'word': word,
                'is_pangram': is_pangram,
                'length': len(word)
            })
        
        return {
            'puzzle': puzzle_data,
            'words': words_data
        }
    
    except Exception as e:
        logging.error(f"Error parsing puzzle {puzzle_id}: {str(e)}")
        return None

def save_to_database(data, db_path="spelling_bee.db"):
    """
    Save scraped data to the SQLite database
    """
    if not data:
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Insert puzzle data
        puzzle_data = data['puzzle']
        cursor.execute('''
        INSERT OR REPLACE INTO puzzles 
        (puzzle_id, date, word_count, pangrams_count, letters, other_letters, all_letters)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            puzzle_data['puzzle_id'],
            puzzle_data['date'],
            puzzle_data['word_count'],
            puzzle_data['pangrams_count'],
            puzzle_data['letters'],
            puzzle_data['other_letters'],
            puzzle_data['all_letters']
        ))
        
        # Insert words data
        for word_data in data['words']:
            cursor.execute('''
            INSERT OR REPLACE INTO words 
            (puzzle_id, word, is_pangram, length)
            VALUES (?, ?, ?, ?)
            ''', (
                puzzle_data['puzzle_id'],
                word_data['word'],
                1 if word_data['is_pangram'] else 0,
                word_data['length']
            ))
        
        conn.commit()
        conn.close()
        return True
    
    except Exception as e:
        logging.error(f"Error saving puzzle {puzzle_data['puzzle_id']} to database: {str(e)}")
        return False

def process_puzzle(puzzle_id, db_path):
    """
    Process a single puzzle: scrape and save to database
    """
    try:
        data = scrape_spelling_bee(puzzle_id)
        if data:
            if save_to_database(data, db_path):
                logging.info(f"Successfully processed puzzle {puzzle_id}")
                return True
            else:
                logging.warning(f"Failed to save puzzle {puzzle_id} to database")
        else:
            logging.warning(f"No data returned for puzzle {puzzle_id}")
        return False
    except Exception as e:
        logging.error(f"Error processing puzzle {puzzle_id}: {str(e)}")
        return False

def scrape_all_puzzles(start_id=2565, end_id=1, max_workers=20, db_path="spelling_bee.db"):
    """
    Scrape all puzzles from start_id down to end_id using parallel processing
    
    Args:
        start_id: The puzzle ID to start from (most recent)
        end_id: The puzzle ID to end at (oldest)
        max_workers: Maximum number of parallel workers
        db_path: Path to the SQLite database file
    """
    logging.info(f"Starting to scrape puzzles from {start_id} to {end_id} with {max_workers} workers")
    
    # Create a list of all puzzle IDs to scrape
    puzzle_ids = list(range(end_id, start_id + 1))
    
    # Check which puzzles are already in the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT puzzle_id FROM puzzles")
    existing_puzzle_ids = [row[0] for row in cursor.fetchall()]
    conn.close()
    
    # Filter out puzzles that are already in the database
    puzzle_ids_to_scrape = [pid for pid in puzzle_ids if pid not in existing_puzzle_ids]
    
    if not puzzle_ids_to_scrape:
        logging.info("All puzzles already in database")
        return
    
    logging.info(f"Scraping {len(puzzle_ids_to_scrape)} puzzles (skipping {len(existing_puzzle_ids)} existing puzzles)")
    
    # Use ThreadPoolExecutor for parallel processing
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Create a dictionary mapping futures to their puzzle IDs
        future_to_puzzle_id = {
            executor.submit(process_puzzle, puzzle_id, db_path): puzzle_id 
            for puzzle_id in puzzle_ids_to_scrape
        }
        
        # Process completed futures with a progress bar
        successful = 0
        with tqdm(total=len(puzzle_ids_to_scrape), desc="Scraping puzzles") as pbar:
            for future in concurrent.futures.as_completed(future_to_puzzle_id):
                puzzle_id = future_to_puzzle_id[future]
                try:
                    result = future.result()
                    if result:
                        successful += 1
                    pbar.update(1)
                except Exception as e:
                    logging.error(f"Exception processing puzzle {puzzle_id}: {str(e)}")
                    pbar.update(1)
    
    logging.info(f"Scraping completed. Successfully scraped {successful}/{len(puzzle_ids_to_scrape)} puzzles.")

def query_database(db_path="spelling_bee.db"):
    """
    Print some statistics from the database
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get puzzle count
    cursor.execute("SELECT COUNT(*) FROM puzzles")
    puzzle_count = cursor.fetchone()[0]
    
    # Get word count
    cursor.execute("SELECT COUNT(*) FROM words")
    word_count = cursor.fetchone()[0]
    
    # Get pangram count
    cursor.execute("SELECT COUNT(*) FROM words WHERE is_pangram = 1")
    pangram_count = cursor.fetchone()[0]
    
    # Get most recent puzzle
    cursor.execute("SELECT puzzle_id, date, word_count FROM puzzles ORDER BY puzzle_id DESC LIMIT 1")
    most_recent = cursor.fetchone()
    
    # Get earliest puzzle
    cursor.execute("SELECT puzzle_id, date, word_count FROM puzzles ORDER BY puzzle_id ASC LIMIT 1")
    earliest = cursor.fetchone()
    
    conn.close()
    
    print("\nDatabase Statistics:")
    print(f"Total puzzles: {puzzle_count}")
    print(f"Total words: {word_count}")
    print(f"Total pangrams: {pangram_count}")
    
    if most_recent:
        print(f"\nMost recent puzzle: #{most_recent[0]} ({most_recent[1]}) with {most_recent[2]} words")
    
    if earliest:
        print(f"Earliest puzzle: #{earliest[0]} ({earliest[1]}) with {earliest[2]} words")
    
    print("\nDatabase ready for use!")

if __name__ == "__main__":
    start_time = time.time()
    
    # Setup the database
    db_path = setup_database()
    
    # Start scraping - adjust these parameters as needed
    latest_puzzle_id = 2565  # Most recent puzzle ID
    oldest_puzzle_id = 1     # Oldest puzzle ID
    max_concurrent_requests = 10  # Number of parallel requests (be careful with this)
    
    # Run the scraper
    scrape_all_puzzles(
        start_id=latest_puzzle_id, 
        end_id=oldest_puzzle_id, 
        max_workers=max_concurrent_requests,
        db_path=db_path
    )
    
    # Print statistics
    query_database(db_path)
    
    elapsed_time = time.time() - start_time
    logging.info(f"Total scraping time: {elapsed_time:.2f} seconds") 