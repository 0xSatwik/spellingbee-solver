import requests
from bs4 import BeautifulSoup
import csv
import re
import os

def scrape_spelling_bee(html_file=None, url=None):
    """
    Scrape Spelling Bee answers from either a local HTML file or a URL
    """
    # Get the content either from file or URL
    if html_file and os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
    elif url:
        response = requests.get(url)
        content = response.text
    else:
        raise ValueError("Either html_file or url must be provided")
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Extract date
    date_element = soup.select_one('span.bee-date.bee-loud.bee-hover')
    date_text = date_element.text if date_element else "Unknown Date"
    date_match = re.search(r'Spelling Bee for (.+)', date_text)
    date = date_match.group(1).strip() if date_match else date_text
    
    # Extract word count
    word_count_element = soup.find('b', string=re.compile(r'words:'))
    word_count = "0"
    if word_count_element and word_count_element.next_sibling:
        word_count = word_count_element.next_sibling.strip()
    
    # Extract pangrams count
    pangrams_element = soup.find('b', string=re.compile(r'pangrams:'))
    pangrams_count = "0"
    if pangrams_element and pangrams_element.next_sibling:
        pangrams_count = pangrams_element.next_sibling.strip()
    
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
    
    # Filter out pangrams from regular words list
    regular_words = [word for word in all_words if word.upper() not in [p.upper() for p in pangram_words]]
    
    # Prepare results
    results = {
        'date': date,
        'word_count': word_count,
        'pangrams_count': pangrams_count,
        'letters': center_letter,
        'other_letters': other_letters,
        'all_letters': letters,
        'pangrams': ', '.join(pangram_words),
        'words': ', '.join(regular_words)
    }
    
    return results

def save_to_csv(data, filename="spelling_bee_answers.csv", overwrite=True):
    """
    Save the scraped data to a CSV file
    
    Args:
        data (dict): The data to save
        filename (str): The filename to save to
        overwrite (bool): If True, existing file will be deleted and recreated
    """
    # Define the correct fieldnames
    fieldnames = ['date', 'word_count', 'pangrams_count', 'letters', 'other_letters', 'all_letters', 'pangrams', 'words']
    
    # Check if file exists but has old format
    needs_migration = False
    if os.path.isfile(filename) and not overwrite:
        with open(filename, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            header = next(reader, None)
            if header and ('score' in header or 'center_letter' in header or 'other_letters' not in header):
                needs_migration = True
    
    # If overwrite is True or migration needed, delete the existing file
    if overwrite or needs_migration:
        if os.path.isfile(filename):
            os.remove(filename)
            print(f"Removed existing file: {filename}")
    
    # Create the file if it doesn't exist
    file_exists = os.path.isfile(filename)
    
    with open(filename, 'a', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write header only if file doesn't exist
        if not file_exists:
            writer.writeheader()
        
        writer.writerow(data)
    
    print(f"Data saved to {filename}")

def main():
    try:
        # Scrape the data from either the local file or URL
        data = scrape_spelling_bee(html_file="structue.html")
        # Uncomment the line below to scrape directly from the website
        # data = scrape_spelling_bee(url="https://www.sbsolver.com/2565")
        
        # Save to CSV (overwriting any existing file to ensure correct format)
        save_to_csv(data, overwrite=True)
        
        # Print summary
        print("\nScraping Summary:")
        print(f"Date: {data['date']}")
        print(f"Word Count: {data['word_count']}")
        print(f"Center Letter: {data['letters']}")
        print(f"Other Letters: {data['other_letters']}")
        print(f"All Letters: {data['all_letters']}")
        print(f"Pangrams Count: {data['pangrams_count']}")
        print(f"Pangrams: {data['pangrams']}")
        print(f"Total Regular Words: {len(data['words'].split(', ')) if data['words'] else 0}")
        
        print("\nScraping completed successfully!")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    main() 