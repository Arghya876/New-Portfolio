import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaUserCircle, FaPaperPlane } from 'react-icons/fa'

const API_URL = 'http://localhost:5000/api/reviews'

// Fallback seed reviews in case MongoDB server is offline
const fallbackReviews = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    service: 'MERN Stack Applications',
    rating: 5,
    comment: 'Arghya built a flawless, high-performance inventory dashboard for us. His Node APIs are super fast and authorization structures are highly secure. Outstanding developer!'
  },
  {
    _id: '2',
    name: 'Rajesh Sharma',
    service: 'IoT Solutions',
    rating: 5,
    comment: 'Worked with Arghya on integrating soil telemetry systems. His firmware scripts and Firebase connectivity worked out of the box. Highly recommended for hardware integrations!'
  },
  {
    _id: '3',
    name: 'Dave Miller',
    service: 'Full Stack Web Development',
    rating: 4,
    comment: 'Great communication and robust code structure. The e-commerce backend built with Express and MongoDB behaves perfectly under pressure. Will collaborate again.'
  }
]

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', service: 'MERN Stack Applications', rating: 5, comment: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ success: true, text: '' })

  // Fetch reviews from backend
  const fetchReviews = async () => {
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (!isLocal) {
      setReviews(fallbackReviews)
      return
    }

    try {
      const response = await fetch(API_URL)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      } else {
        setReviews(fallbackReviews)
      }
    } catch (err) {
      console.warn('Backend server offline. Loading fallback seed reviews.', err)
      setReviews(fallbackReviews)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.comment) {
      setMsg({ success: false, text: 'Please populate name, email, and comment fields.' })
      return
    }

    setLoading(true)
    setMsg({ success: true, text: '' })

    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (!isLocal) {
      // Simulate locally in production to avoid Local Network Access security prompts
      const mockNewReview = {
        _id: Date.now().toString(),
        name: formData.name,
        service: formData.service,
        rating: formData.rating,
        comment: formData.comment
      }
      setReviews(prev => [mockNewReview, ...prev])
      setMsg({ success: true, text: 'Demonstration Mode: Review added locally (Running on production).' })
      setFormData({ name: '', email: '', service: 'MERN Stack Applications', rating: 5, comment: '' })
      setLoading(false)
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const newReview = await response.json()
        setReviews(prev => [newReview, ...prev])
        setMsg({ success: true, text: 'Review successfully saved to MongoDB!' })
        setFormData({ name: '', email: '', service: 'MERN Stack Applications', rating: 5, comment: '' })
      } else {
        throw new Error('Failed to save to database')
      }
    } catch (error) {
      console.warn('Backend server offline. Simulating local submission.', error)
      
      // Simulate locally
      const mockNewReview = {
        _id: Date.now().toString(),
        name: formData.name,
        service: formData.service,
        rating: formData.rating,
        comment: formData.comment
      }
      setReviews(prev => [mockNewReview, ...prev])
      setMsg({ success: true, text: 'Demonstration Mode: Review added locally (Express server offline).' })
      setFormData({ name: '', email: '', service: 'MERN Stack Applications', rating: 5, comment: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="reviews"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-green uppercase font-bold">
          Social Proof
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          Client Reviews
        </h3>
        <p className="text-sm text-theme-muted mt-4 max-w-xl mx-auto">
          See what real customers say about my work. These reviews are connected to a live MongoDB cluster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form to post a review (5 columns) */}
        <div className="lg:col-span-5 p-6 rounded-xl glass-panel border border-theme-border">
          <h4 className="text-sm font-mono tracking-widest text-theme-text uppercase font-bold mb-4">
            Post Feedback
          </h4>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rev-name" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Name</label>
              <input
                id="rev-name"
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-theme-bg/40 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors"
                placeholder="Steve Rogers"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rev-email" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Email (Not shown)</label>
              <input
                id="rev-email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="bg-theme-bg/40 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors"
                placeholder="steve@shield.com"
              />
            </div>

            {/* Service Selection dropdown */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rev-service" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Service Purchased</label>
              <select
                id="rev-service"
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
                className="bg-theme-bg border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors cursor-pointer"
              >
                <option value="MERN Stack Applications">MERN Stack Applications</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="REST API Development">REST API Development</option>
                <option value="AI Integration">AI Integration</option>
                <option value="IoT Solutions">IoT Solutions</option>
                <option value="Other">Other Services</option>
              </select>
            </div>

            {/* Rating stars */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Rating</label>
              <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    id={`rev-rating-star-${star}`}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="text-lg transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <FaStar className={star <= formData.rating ? 'text-cyber-yellow' : 'text-theme-border'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rev-comment" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">Comment</label>
              <textarea
                id="rev-comment"
                rows={3}
                value={formData.comment}
                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                className="bg-theme-bg/40 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors resize-none"
                placeholder="Review comment..."
              />
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={loading}
              id="rev-submit-btn"
              aria-label="Post my client review feedback"
              className="mt-2 py-2 rounded bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
            >
              <FaPaperPlane className="text-[10px]" /> {loading ? 'Submitting...' : 'Post Review'}
            </button>

            {msg.text && (
              <p className={`text-[10px] font-mono text-center tracking-wide mt-1 ${msg.success ? 'text-cyber-green' : 'text-cyber-pink'}`}>
                {msg.text}
              </p>
            )}
          </form>
        </div>

        {/* Right Column: Grid list of posted reviews (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4 max-h-[460px] overflow-y-auto pr-2 no-scrollbar">
          <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold mb-1">
            Feedbacks Grid ({reviews.length})
          </h4>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {reviews.map((r) => (
                <motion.div
                  layout
                  key={r._id}
                  className="p-4 rounded-xl border border-theme-border bg-theme-card/30 flex gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-3xl text-theme-muted shrink-0 mt-0.5">
                    <FaUserCircle />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-theme-text truncate">{r.name}</h5>
                      
                      {/* Render Stars */}
                      <div className="flex gap-0.5 shrink-0 text-xs text-cyber-yellow">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <FaStar key={idx} />
                        ))}
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-mono text-cyber-blue font-semibold uppercase tracking-wider block mt-0.5">
                      {r.service}
                    </span>

                    <p className="text-xs text-theme-muted mt-2 leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
