import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SiJavascript, SiPython, SiHtml5, 
  SiReact, SiVite, 
  SiNodedotjs, SiExpress, SiJsonwebtokens, 
  SiMongodb, SiMysql, 
  SiTensorflow, SiOpencv, 
  SiGit, SiGithub, SiArduino, SiDocker
} from 'react-icons/si'
import { FaJava, FaCss3Alt, FaCode, FaServer, FaBrain, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa'

const categories = [
  { id: 'languages', name: 'Languages' },
  { id: 'web', name: 'Web Dev (MERN)' },
  { id: 'ai-iot', name: 'AI & IoT' },
  { id: 'tools', name: 'Tools / DevOps' }
]

const skillsData = [
  { name: 'JavaScript', category: 'languages', icon: SiJavascript, color: '#f7df1e' },
  { name: 'Java', category: 'languages', icon: FaJava, color: '#f89820' },
  { name: 'Python', category: 'languages', icon: SiPython, color: '#3776ab' },
  { name: 'HTML5', category: 'languages', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', category: 'languages', icon: FaCss3Alt, color: '#1572b6' },

  { name: 'React.js', category: 'web', icon: SiReact, color: '#61dafb' },
  { name: 'Node.js', category: 'web', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', category: 'web', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', category: 'web', icon: SiMongodb, color: '#47a248' },
  { name: 'JWT Security', category: 'web', icon: SiJsonwebtokens, color: '#00f0ff' },
  { name: 'MySQL', category: 'web', icon: SiMysql, color: '#4479a1' },

  { name: 'TensorFlow', category: 'ai-iot', icon: SiTensorflow, color: '#ff6f00' },
  { name: 'OpenCV', category: 'ai-iot', icon: SiOpencv, color: '#5c3ee8' },
  { name: 'Arduino IDE', category: 'ai-iot', icon: SiArduino, color: '#00979d' },

  { name: 'Docker', category: 'tools', icon: SiDocker, color: '#2496ed' },
  { name: 'Git & GitHub', category: 'tools', icon: SiGithub, color: '#ffffff' },
  { name: 'Vite & Bundlers', category: 'tools', icon: SiVite, color: '#646cff' },
  { name: 'Postman APIs', category: 'tools', icon: SiGit, color: '#ff6c37' }
]

const services = [
  { title: 'Full Stack Development', desc: 'React.js responsive dashboards, REST APIs, and database modeling.', icon: FaCode, color: 'text-cyber-purple border-cyber-purple/20' },
  { title: 'API Integration', desc: 'Secure backend endpoints (JWT auth) with Node/Express and MySQL/MongoDB.', icon: FaServer, color: 'text-cyber-blue border-cyber-blue/20' },
  { title: 'AI & IoT Solutions', desc: 'Integrating OpenCV face recognition pipelines and hardware alert sensors.', icon: FaBrain, color: 'text-cyber-pink border-cyber-pink/20' }
]

const passions = [
  {
    title: 'Guitar & Digital Art',
    desc: 'Expressing feelings and soundscapes through chords and digital art character portraits.',
    img: '/images/guitar_passion.webp',
    slides: [
      '/images/Digital%20Art/My%20Protret%20Digital%20Art.webp',
      '/images/Digital%20Art/Sharingan.webp'
    ]
  },
  {
    title: 'Sketching & Drawing',
    desc: 'Creating fine-line pencil sketches, custom canvases, and character design drafts.',
    img: '/images/drawing_passion.webp',
    slides: [
      '/images/Drawing/AOT.webp',
      '/images/Drawing/Arijit%20Singh.webp',
      '/images/Drawing/My%20Protret%20Pen.webp',
      '/images/Drawing/Shreya%20Ghoshal.webp',
      '/images/Drawing/Solo%20Leveing.webp'
    ]
  },
  {
    title: 'Astrophotography',
    desc: 'Capturing deep-space nebulas, lunar patterns, and constellations using dedicated camera lenses.',
    img: '/images/astrophotography_passion.webp',
    slides: [
      '/images/Astrophotography/With%20Telescope.webp',
      '/images/Astrophotography/Milky%20Way.webp',
      '/images/Astrophotography/Moon.webp',
      '/images/Astrophotography/Moon%201.webp',
      '/images/Astrophotography/Telescope.webp',
      '/images/Astrophotography/Geminid%20Meteor.webp',
      '/images/Astrophotography/Leonid%20Meteor.webp',
      '/images/Astrophotography/Milky%20Way%20Process.webp',
      '/images/Astrophotography/Milky%20Way%20Unprocess.webp'
    ]
  },
  {
    title: 'Blender 3D Modeling',
    desc: 'Sculpting low-poly scenes, texturing, and rendering ambient lighting configurations.',
    img: '/images/blender_passion.webp',
    slides: [
      '/images/Blender/ChessRender.webp',
      '/images/Blender/Chess%20Mirror.webp',
      '/images/Blender/Sword.webp',
      '/images/Blender/Perfume%20Bottle.webp',
      '/images/Blender/BlackHoleBG.webp',
      '/images/Blender/Black%20Hole%20process.webp',
      '/images/Blender/Chess%20Process.webp',
      '/images/Blender/Sword%20Process.webp'
    ]
  }
]

function PassionCarousel({ cover, slides, isActive }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Automatic slide cycle for preview card
  useEffect(() => {
    if (!isActive || !slides || slides.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isActive, slides])

  // Reset index when inactive
  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0)
    }
  }, [isActive])

  if (!isActive || !slides || slides.length === 0) {
    return (
      <img
        src={cover}
        alt="Cover Image"
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    )
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="w-full h-full shrink-0 relative">
            <img
              src={s}
              alt=""
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Manual Controls on PC/Desktop Preview Card */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-cyber-blue text-white w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer active:scale-90 border border-white/10 z-20 shadow"
      >
        <FaChevronLeft size={10} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-cyber-blue text-white w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer active:scale-90 border border-white/10 z-20 shadow"
      >
        <FaChevronRight size={10} />
      </button>
    </div>
  )
}

function PassionCard({ p, idx, onOpenLightbox }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const isActive = isHovered || isClicked

  return (
    <motion.div
      key={idx}
      className="p-4 rounded-xl border border-theme-border bg-theme-card flex flex-col hover:scale-[1.03] transition-all shadow-md odd:rotate-1 even:-rotate-1 hover:rotate-0 select-none cursor-pointer group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsClicked(false)
      }}
      onClick={() => onOpenLightbox(p)}
    >
      {/* Polaroid photo frame with hover zoom indicator */}
      <div className="aspect-square w-full overflow-hidden rounded-lg image-highlight relative shadow-sm h-64 sm:h-auto">
        <PassionCarousel cover={p.img} slides={p.slides} isActive={isActive} />
        
        {/* Click to expand hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 pointer-events-none">
          <span className="bg-cyber-blue/90 border border-cyber-blue/20 text-white text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-wider font-bold shadow-lg scale-90 group-hover:scale-100 transition-transform">
            🔍 Expand Original Size
          </span>
        </div>
      </div>

      {/* Caption details in creative font */}
      <div className="mt-4 flex flex-col text-center items-center">
        <h4 className="text-base font-bold text-theme-text font-serif italic tracking-wide">
          {p.title}
        </h4>
        <p className="text-[11px] text-theme-muted mt-2 leading-relaxed">
          {p.desc}
        </p>
        <span className="text-[8px] font-mono text-cyber-blue uppercase tracking-widest mt-2 block opacity-70">
          Click to View original size ({p.slides.length} works)
        </span>
      </div>
    </motion.div>
  )
}

function LightboxModal({ gallery, onClose }) {
  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = gallery.slides

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
      {/* Floating Close Button - Always visible at top-right on all viewports */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/75 hover:bg-cyber-blue text-white text-base font-bold transition-all cursor-pointer shadow-lg active:scale-95 hover:scale-105"
        title="Close Gallery"
      >
        ✕
      </button>

      {/* Lightbox Header Bar (Padded on the right to avoid overlapping the close button) */}
      <div 
        className="w-full max-w-5xl flex items-center justify-between border-b border-white/10 pb-3 text-white z-10 pr-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4 className="text-sm md:text-lg font-bold font-serif italic text-cyber-blue truncate max-w-[150px] sm:max-w-none">
            {gallery.title}
          </h4>
          <span className="text-[10px] md:text-xs text-white/60 font-mono mt-0.5 block">
            Original Uncropped Size • Image {index + 1} of {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsAutoPlaying(!isAutoPlaying)
            }}
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
      </div>

      {/* Main Image Viewport (object-contain ensures zero crop) */}
      <div 
        className="relative flex-1 w-full flex items-center justify-center max-h-[55vh] md:max-h-[70vh] my-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Center Image (Stops propagation on itself so only clicking empty space closes) */}
        <div className="w-full h-full flex items-center justify-center p-2">
          <motion.img
            key={index}
            src={slides[index]}
            alt={`Hobby Work ${index + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/5 cursor-default relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Left Arrow Button (Rendered after center image to guarantee layering/clickability, absolute, z-30) */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-4 z-30 bg-black/60 hover:bg-cyber-blue text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10 shadow-lg hover:scale-105"
        >
          <FaChevronLeft size={18} />
        </button>

        {/* Right Arrow Button (Rendered after center image to guarantee layering/clickability, absolute, z-30) */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-4 z-30 bg-black/60 hover:bg-cyber-blue text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10 shadow-lg hover:scale-105"
        >
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* Interactive Thumbnail Strip */}
      <div 
        className="w-full max-w-3xl flex gap-2 overflow-x-auto py-2.5 px-4 justify-start sm:justify-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlaying(false)
              setIndex(idx)
            }}
            className={`w-14 h-14 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
              idx === index ? 'border-cyber-blue scale-105 shadow-lg' : 'border-white/10 opacity-40 hover:opacity-100'
            }`}
          >
            <img src={slide} className="w-full h-full object-cover select-none pointer-events-none" alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages')
  const [selectedGallery, setSelectedGallery] = useState(null)

  const filteredSkills = skillsData.filter(s => s.category === activeTab)

  return (
    <section
      id="skills"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-blue uppercase font-bold">
          Capabilities
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          Skills & Services
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Skills dashboard */}
        <div className="lg:col-span-7 flex flex-col">
          <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold mb-4">
            Technical Stack
          </h4>

          {/* Categories Tab selectors */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeTab === c.id
                    ? 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue font-semibold'
                    : 'border-theme-border bg-theme-card/10 text-theme-muted hover:border-theme-border/80 hover:text-theme-text'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-h-[180px]">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    layout
                    key={skill.name}
                    className="p-3.5 rounded-xl glass-panel border border-theme-border flex items-center gap-3 relative group hover:border-theme-text/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <span className="text-xl sm:text-2xl" style={{ color: skill.color }}>
                      <Icon />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-theme-text truncate leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Services list */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold mb-1">
            Solutions Offered
          </h4>

          {services.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.div
                key={idx}
                className="p-4 rounded-xl glass-panel border border-theme-border flex gap-4 items-start hover:border-theme-text/20 transition-all"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`p-2.5 rounded-lg bg-theme-card border border-theme-border text-lg shrink-0 ${s.color}`}>
                  <Icon />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-theme-text">
                    {s.title}
                  </h5>
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Creative Hobbies Section (Polaroid Gallery with Lightbox overlay support) */}
      <div className="mt-24 pt-12 border-t border-theme-border/50">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono tracking-widest text-cyber-pink uppercase font-bold">
            Creative Hobbies
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-theme-text mt-1 font-sans">
            Hobby Beyond Code
          </h3>
          <p className="text-sm text-theme-muted mt-2 max-w-xl mx-auto leading-relaxed">
            A view into the creative hobbies and physical arts that inspire my technical perspectives. Click any card to view original uncropped works.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passions.map((p, idx) => (
            <PassionCard key={idx} p={p} idx={idx} onOpenLightbox={setSelectedGallery} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal (renders on top of everything via React Portal) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedGallery && (
            <motion.div
              key="lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999]"
            >
              <LightboxModal gallery={selectedGallery} onClose={() => setSelectedGallery(null)} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
