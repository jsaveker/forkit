# Lunchlord 🍽️

A fun web application that helps indecisive office workers figure out where to go for lunch. Let the Lunch Oracle guide you to your next meal!

## Features

- 🎲 Random restaurant selection based on your location
- 🗺️ Uses browser geolocation to find nearby restaurants
- 🎨 Modern, clean UI with smooth animations
- 🎯 Food type filtering (coming soon)
- 📱 Fully responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Setup

To use the Google Places API, you'll need to:

1. Create a Google Cloud Project
2. Enable the Places API
3. Create an API key
4. Create a `.env` file in the root directory with:
   ```
   VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Google Places API

## Contributing

Feel free to submit issues and enhancement requests! 