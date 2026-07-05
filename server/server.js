import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-reviews'

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.')
    seedInitialReviews()
  })
  .catch(err => console.error('MongoDB connection error:', err))

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Review = mongoose.model('Review', reviewSchema)

// Seed initial reviews if empty
async function seedInitialReviews() {
  try {
    const count = await Review.countDocuments()
    if (count === 0) {
      const mockReviews = [
        {
          name: 'Sarah Jenkins',
          email: 'sarah.j@innovatesolutions.com',
          service: 'MERN Stack Applications',
          rating: 5,
          comment: 'Arghya built a flawless, high-performance inventory dashboard for us. His Node APIs are super fast and authorization structures are highly secure. Outstanding developer!'
        },
        {
          name: 'Rajesh Sharma',
          email: 'rajesh@agritechiot.in',
          service: 'IoT Solutions',
          rating: 5,
          comment: 'Worked with Arghya on integrating soil telemetry systems. His firmware scripts and Firebase connectivity worked out of the box. Highly recommended for hardware integrations!'
        },
        {
          name: 'Dave Miller',
          email: 'dave@retailflow.store',
          service: 'Full Stack Web Development',
          rating: 4,
          comment: 'Great communication and robust code structure. The e-commerce backend built with Express and MongoDB behaves perfectly under pressure. Will collaborate again.'
        }
      ]
      await Review.insertMany(mockReviews)
      console.log('Seeded initial mock reviews into database.')
    }
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

// REST Endpoints
// 1. Retrieve all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json(reviews)
  } catch (error) {
    console.error('Error retrieving reviews:', error)
    res.status(500).json({ error: 'Failed to retrieve reviews.' })
  }
})

// 2. Submit a new review
app.post('/api/reviews', async (req, res) => {
  const { name, email, service, rating, comment } = req.body

  if (!name || !email || !service || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const newReview = new Review({ name, email, service, rating, comment })
    await newReview.save()
    res.status(201).json(newReview)
  } catch (error) {
    console.error('Error saving review:', error)
    res.status(500).json({ error: 'Failed to save review.' })
  }
})

// Health check route
app.get('/', (req, res) => {
  res.send('Portfolio reviews server is online.')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
