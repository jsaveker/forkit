import { useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/solid'

function App() {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const funTags = [
    "Thy quest ends at...",
    "The Lunch Oracle hath spoken!",
    "Behold, your culinary destiny!",
    "The stars align at...",
    "Your hunger shall be satisfied at..."
  ]

  const handleSummonLunch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Get user's location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      // TODO: Implement Google Places API call here
      // For now, we'll simulate a response
      setTimeout(() => {
        setRestaurant({
          name: "The Tasty Corner",
          type: "American",
          address: "123 Main St",
          rating: 4.5
        })
        setLoading(false)
      }, 1500)
    } catch (err) {
      setError("Unable to find your location. Please enable location services.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">
          Lunchlord
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          He who hungers must choose!
        </p>
        
        {!restaurant && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSummonLunch}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <SparklesIcon className="w-6 h-6" />
            {loading ? "Summoning..." : "Summon Lunch!"}
          </motion.button>
        )}

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {restaurant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card mt-8"
          >
            <p className="text-lg font-medium text-indigo-600 mb-4">
              {funTags[Math.floor(Math.random() * funTags.length)]}
            </p>
            <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2">{restaurant.type} Cuisine</p>
            <p className="text-gray-500 mb-4">{restaurant.address}</p>
            <div className="flex gap-4">
              <button
                onClick={handleSummonLunch}
                className="btn-primary"
              >
                Summon Again
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App 