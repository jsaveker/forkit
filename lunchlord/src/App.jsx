import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/solid'

function App() {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cuisineType, setCuisineType] = useState('')
  const [recentResults, setRecentResults] = useState([])

  const cuisineTypes = [
    'All',
    'American',
    'Italian',
    'Mexican',
    'Chinese',
    'Japanese',
    'Indian',
    'Thai',
    'Mediterranean',
    'Pizza',
    'Burgers',
    'Sandwiches'
  ]

  const funTags = [
    "Thy quest ends at...",
    "The Lunch Oracle hath spoken!",
    "Behold, your culinary destiny!",
    "The stars align at...",
    "Your hunger shall be satisfied at..."
  ]

  useEffect(() => {
    // Load recent results from localStorage
    const saved = localStorage.getItem('recentResults')
    if (saved) {
      setRecentResults(JSON.parse(saved))
    }
  }, [])

  const searchNearbyRestaurants = async (position) => {
    const { latitude, longitude } = position.coords
    const radius = 8000 // 5 miles in meters
    const type = 'restaurant'
    const keyword = cuisineType !== 'All' ? cuisineType : ''
    
    // Use our proxy server instead of calling Google Places API directly
    const proxyUrl = `http://localhost:3000/api/places/nearby?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}`
    
    try {
      console.log('Fetching restaurants from proxy:', proxyUrl)
      const response = await fetch(proxyUrl)
      const data = await response.json()
      console.log('API response:', data)
      
      if (data.status === 'OK' && data.results.length > 0) {
        // Randomly select a restaurant
        const randomIndex = Math.floor(Math.random() * data.results.length)
        const selectedPlace = data.results[randomIndex]
        
        // Get additional details for the selected place using our proxy
        const detailsProxyUrl = `http://localhost:3000/api/places/details?place_id=${selectedPlace.place_id}&fields=name,formatted_address,rating,types,photos`
        console.log('Fetching details from proxy:', detailsProxyUrl)
        const detailsResponse = await fetch(detailsProxyUrl)
        const detailsData = await detailsResponse.json()
        console.log('Details response:', detailsData)
        
        const newRestaurant = {
          name: selectedPlace.name,
          type: selectedPlace.types[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          address: selectedPlace.vicinity,
          rating: selectedPlace.rating,
          photo: selectedPlace.photos?.[0]?.photo_reference
        }
        
        // Update recent results
        const updatedResults = [newRestaurant, ...recentResults.slice(0, 4)]
        setRecentResults(updatedResults)
        localStorage.setItem('recentResults', JSON.stringify(updatedResults))
        
        setRestaurant(newRestaurant)
      } else {
        console.error('API error:', data.status, data.error_message)
        throw new Error(data.error_message || 'No restaurants found in your area')
      }
    } catch (err) {
      console.error('Error fetching restaurant data:', err)
      throw new Error('Failed to fetch restaurant data: ' + err.message)
    }
  }

  const handleSummonLunch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Getting user location...')
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })
      console.log('User location:', position.coords)
      
      await searchNearbyRestaurants(position)
    } catch (err) {
      console.error('Error in handleSummonLunch:', err)
      if (err.code === 1) {
        setError("Location access denied. Please enable location services in your browser settings.")
      } else if (err.code === 2) {
        setError("Location unavailable. Please check your device's location services.")
      } else if (err.code === 3) {
        setError("Location request timed out. Please try again.")
      } else {
        setError(err.message || "Unable to find your location. Please enable location services.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Fork It!
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            Because someone has to decide.
          </p>
        </motion.div>

        <div className="mb-8">
          <select
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Cuisines</option>
            {cuisineTypes.slice(1).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {!restaurant && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSummonLunch}
            disabled={loading}
            className="btn-primary flex items-center gap-2 mx-auto text-lg"
          >
            <SparklesIcon className="w-6 h-6" />
            {loading ? "Summoning..." : "Summon Lunch!"}
          </motion.button>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 bg-red-50 p-4 rounded-lg"
          >
            {error}
          </motion.p>
        )}

        {restaurant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card mt-8 backdrop-blur-sm bg-white/90"
          >
            <p className="text-lg font-medium text-indigo-600 mb-4">
              {funTags[Math.floor(Math.random() * funTags.length)]}
            </p>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2 text-lg">{restaurant.type}</p>
            <p className="text-gray-500 mb-2">{restaurant.address}</p>
            {restaurant.rating && (
              <p className="text-gray-500 mb-6">Rating: {restaurant.rating} ⭐</p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSummonLunch}
                className="btn-primary"
              >
                Summon Again
              </button>
            </div>
          </motion.div>
        )}

        {recentResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Results</h3>
            <div className="grid gap-4">
              {recentResults.map((result, index) => (
                <div key={index} className="bg-white/50 p-4 rounded-lg">
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm text-gray-600">{result.type}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App
