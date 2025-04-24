# NYT Spelling Bee Solver

A web application that helps solve the New York Times Spelling Bee puzzle. This tool finds all possible words for a given set of letters, prioritizing pangrams and organizing words by length.

## Features

- **Two input methods:**
  - Traditional text input for quick entry
  - Interactive hexagonal interface that mimics the NYT Spelling Bee puzzle layout
- Input center letter and outer letters from the NYT Spelling Bee puzzle
- View all possible valid words sorted by length
- Highlight pangrams (words that use all letters)
- Word counts and statistics
- SEO-friendly structure for content about Spelling Bee
- Articles section with tips and strategies for the game

## Technology Stack

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS for styling
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/spellingbee-solver.git
   cd spellingbee-solver
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/page.tsx` - The home page with the solver tool
- `src/app/api/solve/route.ts` - API endpoint for solving puzzles
- `src/app/today/page.tsx` - Page showing today's Spelling Bee answers
- `src/app/articles/page.tsx` - Articles listing page
- `src/app/articles/[slug]/page.tsx` - Dynamic article page
- `src/components/SpellingBeeSolver.tsx` - The main solver component
- `src/components/HexagonalInput.tsx` - The hexagonal puzzle input interface

## How It Works

The solver uses a comprehensive dictionary from [words/an-array-of-english-words](https://github.com/words/an-array-of-english-words) to find all possible words that:

1. Are at least 4 letters long
2. Contain the center letter
3. Only use the provided letters

Pangrams (words that use all seven letters) are displayed first, followed by other words organized by length.

## How to Use

1. Choose your preferred input method: Text Input or Hexagon Input
2. For Text Input:
   - Enter the required center letter in the first field
   - Enter the 6 outer letters in the second field
3. For Hexagon Input:
   - Click on a cell to select it
   - Type a letter or use the on-screen keyboard
   - The yellow center cell is for the required letter
4. Click "Solve Puzzle" to get all possible words

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This project is not affiliated with The New York Times or the official Spelling Bee game. It is an independent tool created for educational and entertainment purposes.
