const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for Google Places API
app.get('/api/places/nearby', async (req, res) => {
  try {
    const { location, radius, type, keyword } = req.query;
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    
    console.log(`Proxying request to Google Places API with params:`, { location, radius, type, keyword });
    
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location,
        radius,
        type,
        keyword,
        key: apiKey
      }
    });
    
    console.log(`Google Places API response status: ${response.data.status}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Google Places API:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from Google Places API',
      details: error.message
    });
  }
});

// Proxy endpoint for Google Places Details API
app.get('/api/places/details', async (req, res) => {
  try {
    const { place_id, fields } = req.query;
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    
    console.log(`Proxying request to Google Places Details API for place_id: ${place_id}`);
    
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id,
        fields,
        key: apiKey
      }
    });
    
    console.log(`Google Places Details API response status: ${response.data.status}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Google Places Details API:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from Google Places Details API',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 