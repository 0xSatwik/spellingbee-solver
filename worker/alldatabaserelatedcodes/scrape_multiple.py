import os
from spelling_bee_scraper import scrape_spelling_bee, save_to_csv
import time
import random

def scrape_multiple_days(base_url, puzzle_ids, output_file="spelling_bee_answers.csv"):
    """
    Scrape multiple Spelling Bee puzzle pages and save to a single CSV
    
    Args:
        base_url (str): Base URL for the Spelling Bee puzzle pages
        puzzle_ids (list): List of puzzle IDs to scrape
        output_file (str): Output CSV filename
    """
    # Delete the output file if it exists to start fresh with the new format
    if os.path.exists(output_file):
        os.remove(output_file)
        print(f"Removed existing file: {output_file}")
    
    total = len(puzzle_ids)
    successful = 0
    
    for i, puzzle_id in enumerate(puzzle_ids):
        try:
            print(f"Scraping puzzle {i+1}/{total} (ID: {puzzle_id})...")
            url = f"{base_url}/{puzzle_id}"
            
            # Scrape the data
            data = scrape_spelling_bee(url=url)
            
            # Save to CSV (set overwrite=False since we're appending multiple entries)
            # First entry needs to create the file with headers
            save_to_csv(data, filename=output_file, overwrite=(i==0))
            
            successful += 1
            
            # Print progress
            print(f"Completed: {i+1}/{total} ({successful} successful)")
            print(f"Center Letter: {data['letters']}")
            print(f"Other Letters: {data['other_letters']}")
            print(f"All Letters: {data['all_letters']}")
            
            # Add a small random delay to avoid overloading the server
            if i < total - 1:
                delay = random.uniform(1.0, 3.0)
                print(f"Waiting {delay:.2f} seconds...")
                time.sleep(delay)
            
        except Exception as e:
            print(f"Error scraping puzzle {puzzle_id}: {str(e)}")
    
    print(f"\nScraping completed. Successfully scraped {successful}/{total} puzzles.")
    print(f"Results saved to {output_file}")

if __name__ == "__main__":
    # Example usage:
    # For now, we'll just scrape puzzle ID 2565 as requested
    base_url = "https://www.sbsolver.com/s"
    puzzle_ids = ["2566"]
    
    scrape_multiple_days(base_url, puzzle_ids)
    
    # Uncomment below to scrape multiple puzzles (example for IDs 2560-2565)
    # puzzle_ids = [str(i) for i in range(2560, 2566)]
    # scrape_multiple_days(base_url, puzzle_ids) 