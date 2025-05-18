# Spelling Bee Puzzle Explorer

This repository contains tools for collecting, storing, and exploring New York Times Spelling Bee puzzles.

## Project Structure

- `spellingbee_database_scraper.py`: Script to scrape Spelling Bee puzzles and store them in a SQLite database
- `web_database_explorer.py`: Flask web application for browsing and searching puzzles
- `remove_score_field.py`: Script that removed the 'score' field from the database schema
- `worker/`: Cloudflare Worker API for accessing the database through the cloud

## Local Web Application

The Flask web application provides a user interface for browsing and exploring puzzles. Features include:

- Browse all puzzles with pagination
- View detailed information about each puzzle
- Search puzzles by date, letter, or word
- View statistics about letters, pangrams, and more

To run the web application:

```
python web_database_explorer.py
```

Then visit http://localhost:5000 in your browser.

## Cloudflare Worker API

The Cloudflare Worker provides RESTful API access to the puzzle database. Key features:

- JSON API endpoints for all data
- Fast global access through Cloudflare's network
- Database hosted in Cloudflare D1

For details on setting up and deploying the Worker API, see [worker/README.md](worker/README.md) and [worker/DEPLOYMENT.md](worker/DEPLOYMENT.md).

## Database Schema

The database contains two tables:

### Puzzles Table

```sql
CREATE TABLE puzzles (
    id INTEGER PRIMARY KEY,
    puzzle_id INTEGER UNIQUE,
    date TEXT,
    word_count INTEGER,
    pangrams_count INTEGER,
    letters TEXT,
    other_letters TEXT,
    all_letters TEXT
)
```

### Words Table

```sql
CREATE TABLE words (
    id INTEGER PRIMARY KEY,
    puzzle_id INTEGER,
    word TEXT,
    is_pangram INTEGER,
    length INTEGER,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(puzzle_id),
    UNIQUE(puzzle_id, word)
)
```

## Getting Started

1. **Clone the repository**
2. **Set up the database**: Run `spellingbee_database_scraper.py` to create and populate the database
3. **Explore locally**: Run `web_database_explorer.py` to start the web interface
4. **Deploy to cloud**: Follow the instructions in `worker/DEPLOYMENT.md` to deploy the API

## License

This project is licensed under the MIT License - see the LICENSE file for details. 