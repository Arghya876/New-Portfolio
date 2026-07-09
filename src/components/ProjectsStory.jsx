import { useState, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaLaptopCode, 
  FaChild, 
  FaFireExtinguisher, 
  FaSmile, 
  FaUserShield,
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

const projects = [
  {
    chapter: '01',
    title: 'NovaCart',
    tagline: 'MERN Stack E-Commerce Platform',
    icon: FaLaptopCode,
    images: [
      '/images/Projects/Novacart/Novacart Home.webp',
      '/images/Projects/Novacart/Novacart Category.webp',
      '/images/Projects/Novacart/Novacart Login.webp',
      '/images/Projects/Novacart/Novacart Wishlist.webp',
      '/images/Projects/Novacart/Novacart Sopping Cart.webp',
      '/images/Projects/Novacart/Novacart Shopping Details.webp'
    ],
    problem: 'Traditional e-commerce architectures face critical bottlenecks in database querying speed, session vulnerabilities (such as insecure local token storage), and high setup complexity. Connecting external database structures under strict IP whitelists often results in immediate server failure during local runs or development.',
    solution: 'Designed and deployed a state-of-the-art MERN e-commerce application. Secured logins with JWT access/refresh token rotation over secure HttpOnly cookies, optimized database indexing for rapid queries, and integrated secure payment portals (Stripe & Razorpay). Built a zero-setup backend that spins up an in-memory database server when remote connection fails.',
    tech: ['React 19', 'Vite 8', 'Redux Toolkit', 'Tailwind CSS v4', 'Node.js', 'Express 5', 'MongoDB', 'Stripe', 'Razorpay', 'JWT Auth', 'GSAP', 'Framer Motion'],
    github: 'https://github.com/Arghya876/Novacart.git',
    demo: 'https://novacart-arghya876.vercel.app/',
    accent: 'text-cyber-purple',
    badge: 'MERN STACK LIVE'
  },
  {
    chapter: '02',
    title: 'Little Guardian',
    tagline: 'AI-Powered Baby Monitoring System',
    icon: FaChild,
    images: [
      '/images/Projects/Little Guardian/Little Guardian  Home.webp',
      '/images/Projects/Little Guardian/Little Guardian Features.webp',
      '/images/Projects/Little Guardian/Little Guardian How It Works.webp',
      '/images/Projects/Little Guardian/Little Guardian Login.webp',
      '/images/Projects/Little Guardian/Little Guardian Contact.webp',
      '/images/Projects/Little Guardian/Little Guardian Dashboard.webp',
      '/images/Projects/Little Guardian/Little Guardian Emotion Detection.webp',
      '/images/Projects/Little Guardian/Little Guardian Object Detection.webp',
      '/images/Projects/Little Guardian/Little Guardian Baby Profile.webp',
      '/images/Projects/Little Guardian/Little Guardian  Feeding Tracker.webp'
    ],
    problem: 'Traditional baby monitors are limited to basic audio/video feeds, failing to detect emotional distress, crying reasons, or physical hazards in real-time.',
    solution: 'Designed and implemented a full-stack, multi-service baby safety monitoring ecosystem. Integrates a React + Vite frontend, a Spring Boot backend API with MongoDB, and Python AI modules for real-time cry analysis, emotion detection, and object detection. Includes Google OAuth/JWT security and Firebase push alerts.',
    tech: ['React', 'Vite', 'Spring Boot', 'Python', 'AI & OpenCV', 'MongoDB', 'JWT Auth', 'Firebase'],
    github: 'https://github.com/Arghya876/Little-Guardian.git',
    demo: 'https://little-guardian-frontend.onrender.com/',
    accent: 'text-cyber-blue',
    badge: 'FULL-STACK AI'
  },
  {
    chapter: '03',
    title: 'AI-Based LPG Leakage & Fire Alert',
    tagline: 'Patent Published Invention',
    icon: FaFireExtinguisher,
    images: ['/images/Achivement/Patent.webp'],
    problem: 'Gas leakage hazards in industrial or residential sectors require instant automatic dispatch warning triggers to prevent accidents before manual checkups occur.',
    solution: 'Co-invented a published patent system mapping MQ gas sensors with Arduino boards. Programmed a Python alert engine that evaluates risk levels and automatically alerts administrators via WhatsApp using the Twilio API.',
    tech: ['Python', 'Arduino IDE', 'Twilio API', 'IoT Sensors', 'Patent-Backed'],
    github: 'https://github.com/Arghya876/LPG-Leakage-Detection',
    demo: '#',
    accent: 'text-cyber-pink',
    badge: 'PATENT PUBLISHED'
  },
  {
    chapter: '04',
    title: 'Face Emotion Recognition',
    tagline: 'Deep Learning Vision Engine',
    icon: FaSmile,
    images: ['/images/Projects/Little Guardian/Little Guardian Emotion Detection.webp'],
    problem: 'Applications usually do not incorporate emotional feedback or fatigue states when tracking human-computer interactive loops.',
    solution: 'Engineered a Convolutional Neural Network (CNN) in Python using TensorFlow to categorize face expressions from live camera streams. Linked OpenCV filters to establish boundaries on tracking frames.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    github: 'https://github.com/Arghya876/Face-Emotion-Recognition',
    demo: '#',
    accent: 'text-cyber-yellow',
    badge: 'DEEP LEARNING'
  },
  {
    chapter: '05',
    title: 'Face Obstruction Detection',
    tagline: 'Real-Time WhatsApp Alert System',
    icon: FaUserShield,
    images: ['/images/Projects/Little Guardian/Little Guardian Object Detection.webp'],
    problem: 'Security surveillance footage records maskings or head coverings but fails to trigger alerts when intruders intentionally cover security camera scopes.',
    solution: 'Coded a computer vision program utilizing OpenCV to detect prolonged face obstructions. Integrated a Python timer loop that fires immediate alert signals and snapshot logs via Twilio API straight to security WhatsApp groups.',
    tech: ['Python', 'OpenCV', 'Twilio API', 'Computer Vision'],
    github: 'https://github.com/Arghya876/Face-Obstruction-Detection',
    demo: '#',
    accent: 'text-cyber-green',
    badge: 'COMPUTER VISION'
  }
]

function ProjectCarousel({ images, title, onImageClick }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (images.length <= 1 || !isHovered) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [images, isHovered])

  useEffect(() => {
    if (!isHovered) {
      setActiveIndex(0)
    }
  }, [isHovered])

  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden group/img image-highlight bg-black/5 dark:bg-black/20 aspect-[16/10] flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onImageClick}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${title} screenshot ${activeIndex + 1}`}
          loading="lazy"
          className="w-full h-full object-contain filter brightness-95"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              id={`projects-carousel-dot-${title.toLowerCase().replace(/\s+/g, '-')}-${idx}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex(idx)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'bg-cyber-blue scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]' 
                  : 'bg-white/40 hover:bg-white/75'
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function LightboxModal({ project, onClose }) {
  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = useMemo(() => project.images || [], [project.images])

  // Auto-scroll loop
  useEffect(() => {
    if (!isAutoPlaying || !slides || slides.length <= 1) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides])

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation()
    setIsAutoPlaying(false)
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation()
    setIsAutoPlaying(false)
    setIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Swipe support triggers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const diff = touchStart - touchEnd
    const minSwipe = 50 // px
    if (diff > minSwipe) {
      handleNext()
    } else if (diff < -minSwipe) {
      handlePrev()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrev, handleNext])

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between py-4 md:py-6 px-4 select-none cursor-zoom-out"
      onClick={onClose}
    >
      {/* Floating Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        id="projects-lightbox-close-btn"
        aria-label="Close lightbox modal"
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/75 hover:bg-cyber-blue text-white text-base font-bold transition-all cursor-pointer shadow-lg active:scale-95 hover:scale-105"
        title="Close Gallery"
      >
        ✕
      </button>

      {/* Lightbox Header Bar */}
      <div 
        className="w-full max-w-5xl flex items-center justify-between border-b border-white/10 pb-3 text-white z-10 pr-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4 className="text-sm md:text-lg font-bold font-sans text-cyber-blue truncate max-w-[150px] sm:max-w-none">
            {project.title}
          </h4>
          <span className="text-[10px] md:text-xs text-white/60 font-mono mt-0.5 block">
            Original Uncropped Size • Image {index + 1} of {slides.length}
          </span>
        </div>
        
        {slides.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsAutoPlaying(!isAutoPlaying)
              }}
              id="projects-lightbox-autoplay-btn"
              aria-label={isAutoPlaying ? "Pause automatic slide transition" : "Start automatic slide transition"}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 text-[10px] md:text-xs font-mono border transition-all cursor-pointer ${
                isAutoPlaying 
                  ? 'border-cyber-green bg-cyber-green/10 text-cyber-green'
                  : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              {isAutoPlaying ? <FaPause size={8} /> : <FaPlay size={8} />}
              {isAutoPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>
        )}
      </div>

      {/* Main Image Viewport */}
      <div 
        className="relative flex-1 w-full flex items-center justify-center max-h-[55vh] md:max-h-[70vh] my-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full h-full flex items-center justify-center p-2">
          <motion.img
            key={index}
            src={slides[index]}
            alt={`${project.title} slide ${index + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/5 cursor-default relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {slides.length > 1 && (
          <>
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              id="projects-lightbox-prev-btn"
              aria-label="View previous project screenshot"
              className="absolute left-2 md:left-4 z-30 bg-black/60 hover:bg-cyber-blue text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10 shadow-lg hover:scale-105"
            >
              <FaChevronLeft size={18} />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              id="projects-lightbox-next-btn"
              aria-label="View next project screenshot"
              className="absolute right-2 md:right-4 z-30 bg-black/60 hover:bg-cyber-blue text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10 shadow-lg hover:scale-105"
            >
              <FaChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Interactive Thumbnail Strip */}
      <div 
        className="w-full max-w-3xl flex gap-2 overflow-x-auto py-2.5 px-4 justify-start sm:justify-center scrollbar-thin scrollbar-white/20 scrollbar-track-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlaying(false)
              setIndex(idx)
            }}
            id={`projects-lightbox-thumb-${idx}`}
            aria-label={`Jump to project screenshot ${idx + 1}`}
            className={`w-14 h-14 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
              idx === index ? 'border-cyber-blue scale-105 shadow-lg' : 'border-white/10 opacity-40 hover:opacity-100'
            }`}
          >
            <img src={slide} loading="lazy" className="w-full h-full object-cover select-none pointer-events-none" alt={`Thumbnail of screenshot ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsStory() {
  const [lightboxProject, setLightboxProject] = useState(null)

  // Scroll lock for page body when lightbox is active
  useEffect(() => {
    if (lightboxProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxProject])

  return (
    <section
      id="projects"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-purple uppercase font-bold">
          Technical Milestones
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          Projects
        </h3>
      </div>

      <div className="flex flex-col gap-20">
        {projects.map((project) => {
          return (
            <motion.div
              key={project.title}
              className="group p-6 md:p-8 rounded-2xl glass-panel border border-theme-border flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch hover:border-theme-text/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${project.accent}`}>
                      Chapter {project.chapter}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-border" />
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted font-bold">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-theme-text mt-3">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-theme-muted mt-1 uppercase tracking-wider block">
                    {project.tagline}
                  </span>

                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex gap-2 text-xs text-theme-muted bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                      <FaExclamationTriangle className="text-cyber-pink shrink-0 mt-0.5" />
                      <div><span className="font-bold text-theme-text">Problem:</span> {project.problem}</div>
                    </div>
                    <div className="flex gap-2 text-xs text-theme-muted bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                      <FaCheckCircle className="text-cyber-green shrink-0 mt-0.5" />
                      <div><span className="font-bold text-theme-text">Solution:</span> {project.solution}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`projects-codebase-link-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      aria-label={`Access source codebase for ${project.title}`}
                      className="flex items-center gap-2 text-[10px] font-mono tracking-wider border border-theme-border px-3.5 py-2 rounded bg-theme-card/30 hover:bg-cyber-blue/15 text-theme-text transition-all cursor-pointer"
                    >
                      <FaGithub /> CODEBASE
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`projects-demo-link-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                        aria-label={`Visit live deployed demonstration for ${project.title}`}
                        className="flex items-center gap-2 text-[10px] font-mono tracking-wider border border-theme-border px-3.5 py-2 rounded bg-theme-card/30 hover:bg-cyber-purple/15 text-theme-text transition-all cursor-pointer"
                      >
                        <FaExternalLinkAlt /> LIVE DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <ProjectCarousel 
                  images={project.images}
                  title={project.title}
                  onImageClick={() => setLightboxProject(project)}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Lightbox Pop-up Modal */}
      {typeof document !== 'undefined' && lightboxProject && createPortal(
        <AnimatePresence>
          <motion.div
            key="projects-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999]"
          >
            <LightboxModal 
              project={lightboxProject} 
              onClose={() => setLightboxProject(null)} 
            />
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
