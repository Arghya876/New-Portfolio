import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaSun, FaMoon, FaFacebook, FaInstagram } from 'react-icons/fa'

const navSections = [
  { id: 'hero', label: 'Intro' },
  { id: 'story', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Achievements' },
  { id: 'contact', label: 'Connect' }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize theme from localStorage (default to light mode)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved ? saved === 'dark' : false
  })

  // Apply theme class to root html and body elements
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      localStorage.setItem('portfolio-theme', 'light')
    }
  }, [isDark])

  // Track page scroll to toggle header background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer to update active section dynamically
  useEffect(() => {
    const observers = []
    
    navSections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0
        }
      )
      observer.observe(el)
      observers.push({ observer, el })
    })

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el))
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[92%] max-w-6xl mt-4 ${
          scrolled
            ? 'py-3.5 px-6 rounded-2xl bg-theme-card/75 backdrop-blur-lg border border-theme-border shadow-lg'
            : 'py-4.5 px-6 rounded-2xl bg-theme-card/35 backdrop-blur-md border border-theme-border/40 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <button 
            onClick={() => scrollTo('hero')} 
            id="nav-logo-btn"
            aria-label="Arghya Bhattacharjee Portfolio Home"
            className="group flex items-center gap-2 cursor-pointer font-sans"
          >
            <span className="text-base sm:text-lg font-bold tracking-wider text-theme-text hover:text-cyber-blue transition-colors">
              Arghya Bhattacharjee
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs">
            {navSections.slice(1).map((section) => (
              <button
                key={section.id}
                id={`nav-desktop-btn-${section.id}`}
                onClick={() => scrollTo(section.id)}
                aria-label={`Navigate to ${section.label} section`}
                className={`uppercase tracking-wider transition-colors relative py-1 cursor-pointer ${
                  activeSection === section.id
                    ? 'text-cyber-blue font-semibold'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-blue to-cyber-purple"
                    layoutId="activeTabIndicator"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Theme toggle & Quick Actions */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              id="theme-toggle-btn"
              aria-label="Toggle visual color theme between light and dark mode"
              className="p-2 rounded-lg border border-theme-border bg-theme-card/30 text-theme-muted hover:text-theme-text hover:bg-theme-card/85 transition-colors cursor-pointer text-sm"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <FaSun className="text-cyber-yellow" /> : <FaMoon className="text-cyber-purple" />}
            </button>

            {/* Social Links (Desktop) */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="https://github.com/Arghya876"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-desktop-social-github"
                aria-label="Access GitHub Profile"
                className="text-theme-muted hover:text-theme-text transition-colors text-lg"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/arghya-bhattacharjee876/"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-desktop-social-linkedin"
                aria-label="Access LinkedIn Profile"
                className="text-theme-muted hover:text-theme-text transition-colors text-lg"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/arghya.bhattacharjee876"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-desktop-social-facebook"
                aria-label="Access Facebook Profile"
                className="text-theme-muted hover:text-theme-text transition-colors text-lg"
                title="Facebook Profile"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/arghya.bhattacharjee876/"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-desktop-social-instagram"
                aria-label="Access Instagram Profile"
                className="text-theme-muted hover:text-theme-text transition-colors text-lg"
                title="Instagram Profile"
              >
                <FaInstagram />
              </a>
              <a
                href="./Arghya_Bhattacharjee_CV.pdf"
                download="Arghya_Bhattacharjee_CV.pdf"
                id="nav-desktop-download-resume"
                aria-label="Download CV Resume PDF document"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 text-xs font-mono tracking-wider transition-all"
              >
                <FaFileDownload /> RESUME
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Navigation Drawer Menu"
            >
              <span
                className={`w-6 h-[2px] bg-theme-text transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-theme-text transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-theme-text transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-theme-bg/95 backdrop-blur-lg z-30 flex flex-col items-center justify-center lg:hidden font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-5 text-center text-lg">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  id={`nav-mobile-btn-${section.id}`}
                  onClick={() => scrollTo(section.id)}
                  aria-label={`Navigate to ${section.label} section`}
                  className={`uppercase tracking-wider transition-colors py-2 cursor-pointer ${
                    activeSection === section.id
                      ? 'text-cyber-blue font-bold glow-text-blue'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Mobile Resume Download Option */}
            <a
              href="./Arghya_Bhattacharjee_CV.pdf"
              download="Arghya_Bhattacharjee_CV.pdf"
              id="nav-mobile-download-resume"
              aria-label="Download CV Resume PDF document"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyber-blue/40 text-cyber-blue hover:bg-cyber-blue/10 text-sm font-mono tracking-wider transition-all mt-8 shadow-[0_0_15px_rgba(0,240,255,0.15)] active:scale-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaFileDownload /> DOWNLOAD RESUME
            </a>

            <div className="flex gap-6 mt-8 text-2xl text-theme-muted">
              <a 
                href="https://github.com/Arghya876" 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-mobile-social-github" 
                aria-label="Access GitHub Profile" 
                className="hover:text-theme-text"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/arghya-bhattacharjee876/" 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-mobile-social-linkedin" 
                aria-label="Access LinkedIn Profile" 
                className="hover:text-theme-text"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://www.facebook.com/arghya.bhattacharjee876" 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-mobile-social-facebook" 
                aria-label="Access Facebook Profile" 
                className="hover:text-theme-text"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/arghya.bhattacharjee876/" 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-mobile-social-instagram" 
                aria-label="Access Instagram Profile" 
                className="hover:text-theme-text"
              >
                <FaInstagram />
              </a>
              <a 
                href="mailto:arghyabhattacharjee876@gmail.com" 
                id="nav-mobile-social-email" 
                aria-label="Send direct Email message to Arghya" 
                className="hover:text-theme-text"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll Progress / Side dot indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-center">
        <span className="text-[9px] font-mono text-theme-muted uppercase tracking-widest rotate-90 my-4 translate-y-3">
          Story Scroll
        </span>
        <div className="w-[1px] h-12 bg-theme-border" />
        {navSections.map((section) => (
          <button
            key={section.id}
            id={`nav-side-dot-${section.id}`}
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll page view to ${section.label} section`}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
            title={section.label}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-cyber-blue scale-125 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                  : 'bg-theme-muted hover:bg-theme-text scale-75 group-hover:scale-100'
              }`}
            />
            <span className="absolute right-8 px-2 py-0.5 rounded bg-theme-bg border border-theme-border text-[9px] font-mono tracking-wider uppercase text-theme-text opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-sm">
              {section.label}
            </span>
          </button>
        ))}
        <div className="w-[1px] h-12 bg-theme-border" />
      </div>
    </>
  )
}
