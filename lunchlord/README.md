# Fork It! - Lunch Decision Maker

A fun and interactive web application that helps you decide where to eat for lunch by randomly selecting a restaurant near you using the Google Places API.

## Features

- Randomly selects a restaurant near your current location
- Filter by cuisine type
- Displays restaurant details including name, type, address, and rating
- Keeps track of recent results
- Beautiful UI with animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Places API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/forkit.git
   cd forkit/lunchlord
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and replace `your_google_places_api_key_here` with your actual Google Places API key.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev:all
   ```
   This will start both the frontend and backend servers.

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Environment Variables

- `VITE_GOOGLE_PLACES_API_KEY`: Your Google Places API key

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion
- Express.js (for the proxy server)
- Google Places API

## License

This project is licensed under the MIT License - see the LICENSE file for details.
