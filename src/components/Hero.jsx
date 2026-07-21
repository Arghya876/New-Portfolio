import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const roles = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'AI & IoT Enthusiast',
  'Patent Holder'
]

function StatCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(target)
    if (start === end) {
      setCount(end)
      return
    }

    const duration = 1.2
    const increment = end / (duration * 60)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-theme-border bg-theme-card/30 relative">
      <span className="text-xl md:text-2xl font-extrabold text-theme-text tracking-tight">
        {count}
        <span className="text-cyber-blue font-bold ml-0.5">{suffix}</span>
      </span>
      <span className="text-[10px] text-theme-muted font-mono mt-1 tracking-wide uppercase text-center">
        {label}
      </span>
    </div>
  )
}

const fetchGitHubRepoCount = async (username, fallback = 15) => {
  const cacheKey = `github-profile-${username}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 3600000 && typeof data.public_repos === 'number') {
        return data.public_repos;
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    if (data && typeof data.public_repos === 'number') {
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      return data.public_repos;
    }
  } catch (err) {
    console.error("Error fetching GitHub repo count, using fallback:", err);
  }
  return fallback;
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)
  const [backLoaded, setBackLoaded] = useState(false)
  const [repoCount, setRepoCount] = useState(15) // fallback to 15 based on live stats
  const isFlipped = isHovered || isClicked

  useEffect(() => {
    fetchGitHubRepoCount('Arghya876', 15).then(count => setRepoCount(count));
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentFullText = roles[roleIndex]
    let timer

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, 40)
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => currentFullText.slice(0, prev.length + 1))
      }, 80)
    }

    if (!isDeleting && displayText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  const handleScrollNext = () => {
    const nextSection = document.getElementById('story')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-24 overflow-hidden"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        
        {/* Left Side: Text Details (7 columns) */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col text-left items-start">
          <motion.div
            className="px-3.5 py-1 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue text-[10px] font-mono tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Available for Freelance & Full-Time Roles
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-text font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-blue">Arghya Bhattacharjee</span>
          </motion.h1>

          <motion.div
            className="h-10 mt-4 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-theme-text font-medium">
              I am a{' '}
              <span className="text-cyber-blue border-r border-cyber-blue pr-1 animate-pulse font-semibold">
                {displayText}
              </span>
            </p>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base text-theme-muted mt-4 leading-relaxed max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I am a passionate software developer specializing in building modern web applications using the MERN Stack (MongoDB, Express.js, React, Node.js) and designing intelligent systems. I am highly passionate about Artificial Intelligence & Machine Learning, constantly exploring deep learning, computer vision, and automated IoT systems.
          </motion.p>

          {/* Quick Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handleScrollNext}
              id="explore-journey-btn"
              aria-label="Explore my professional journey timeline"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-mono text-xs tracking-wider font-semibold shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
            >
              EXPLORE JOURNEY
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
              }}
              id="hire-me-btn"
              aria-label="Scroll down to the contact section to hire me"
              className="px-5 py-2.5 rounded-lg border border-theme-border text-theme-muted hover:text-theme-text font-mono text-xs tracking-wider hover:bg-theme-card/50 transition-all cursor-pointer"
            >
              HIRE ME
            </button>
          </motion.div>

          {/* Core Counters */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <StatCounter target={repoCount.toString()} suffix="+" label="Projects Done" />
            <StatCounter target="5" suffix="+" label="Certs Unlocked" />
            <StatCounter target="1" suffix="" label="Patent Pub" />
            <StatCounter target="1" suffix="" label="Internship" />
          </motion.div>
        </div>

        {/* Right Side: Interactive Flipping Profile Picture Box (5 columns) */}
        <motion.div 
          className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            id="hero-profile-card"
            role="button"
            tabIndex={0}
            aria-label="Interactive profile card. Press Enter or Space to flip between photo and avatar animation."
            className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue rounded-full"
            style={{ perspective: '1000px' }}
            onClick={() => setIsClicked(!isClicked)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsClicked(!isClicked);
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              setIsClicked(false)
            }}
          >
            {/* Outer Glowing Rings */}
            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyber-purple/20 via-transparent to-cyber-blue/20 blur-md pointer-events-none" />
            
            {/* Outer dotted ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-dashed border-cyber-purple/30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: (!frontLoaded || !backLoaded) ? 8 : 25,
                ease: "linear"
              }}
            />

            {/* Inner gradient glowing ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-transparent border-t-cyber-purple border-b-cyber-blue pointer-events-none opacity-80"
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: (!frontLoaded || !backLoaded) ? 3 : 12,
                ease: "linear"
              }}
            />

            <div 
              className="w-full h-full relative"
              style={{ 
                transformStyle: 'preserve-3d', 
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front Side: Round Profile Pic */}
              <div 
                className="absolute inset-0 rounded-full bg-theme-card p-1 image-highlight overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {!frontLoaded && (
                  <div className="absolute inset-1 rounded-full bg-theme-bg flex flex-col items-center justify-center z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-theme-card via-theme-border/30 to-theme-card animate-pulse" />
                    {/* A nice mini-spinner */}
                    <div className="w-10 h-10 rounded-full border-4 border-cyber-purple border-t-transparent animate-spin relative z-20" />
                    <span className="text-[10px] text-theme-muted font-mono mt-3 animate-pulse relative z-20">LOADING...</span>
                  </div>
                )}
                <img
                  src="/images/profile_pic.webp"
                  alt="Arghya Bhattacharjee"
                  fetchPriority="high"
                  className={`w-full h-full object-cover rounded-full transition-all duration-700 ease-out ${frontLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  onLoad={() => setFrontLoaded(true)}
                />
              </div>
              
              {/* Back Side: Round Avatar Pic */}
              <div 
                className="absolute inset-0 rounded-full bg-theme-card p-1 image-highlight overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {!backLoaded && (
                  <div className="absolute inset-1 rounded-full bg-theme-bg flex flex-col items-center justify-center z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-theme-card via-theme-border/30 to-theme-card animate-pulse" />
                    <div className="w-10 h-10 rounded-full border-4 border-cyber-blue border-t-transparent animate-spin relative z-20" />
                    <span className="text-[10px] text-theme-muted font-mono mt-3 animate-pulse relative z-20">LOADING...</span>
                  </div>
                )}
                <img
                  src="/images/Avatar.webp"
                  alt="Arghya Avatar"
                  fetchPriority="high"
                  className={`w-full h-full object-cover rounded-full transition-all duration-700 ease-out ${backLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  onLoad={() => setBackLoaded(true)}
                />
              </div>
            </div>

            {/* Speech bubble popup */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  className="absolute -top-14 left-1/2 -translate-x-1/2 bg-cyber-blue text-white text-xs px-4 py-2 rounded-full font-sans font-semibold shadow-xl z-20 whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  Hi! Welcome to my page! 👋
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-cyber-blue rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      <motion.button
        onClick={handleScrollNext}
        id="scroll-down-btn"
        aria-label="Scroll down to the next section"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 cursor-pointer text-theme-muted hover:text-cyber-blue transition-colors focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span className="text-[9px] font-mono tracking-widest uppercase">Scroll Down</span>
        <motion.div
          className="text-base"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>
    </section>
  )
}
