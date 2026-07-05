import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { FaBook, FaCodeBranch, FaFire, FaAward } from 'react-icons/fa'

const certs = [
  { 
    title: 'Patent File', 
    issuer: 'Patent Office India', 
    xp: '500 XP', 
    img: '/images/Achivement/Patent.webp', 
    color: '#ff0055',
    description: '🎉 Excited to announce that our patent for the "AI-Based LPG Gas Leakage Detection and Fire Alert System Notification" was officially published on April 19, 2024! 🚨 This innovative technology combines LPG gas detection with fire alert mechanisms and real-time WhatsApp notifications to significantly enhance home safety.',
    pdf: '/images/Achivement/Patent file.webp'
  },
  { 
    title: 'Google Cybersecurity Certificate', 
    issuer: 'Google Certifications', 
    xp: '450 XP', 
    img: '/images/google_cert.webp', 
    color: '#4285f4',
    description: 'Professional certification demonstrating competence in security analyst tools, network defense, threat hunting, and incident response frameworks.'
  },
  { 
    title: 'JavaScript Essentials 1', 
    issuer: 'Cisco', 
    xp: '300 XP', 
    img: '/images/achievement_badge.webp', 
    color: '#f7df1e',
    description: 'Cisco, in collaboration with OpenEDG JS Institute, verifies the earner of this badge successfully completed the JavaScript Essentials 1 course and achieved the student level credentials. Earners know the syntax of the core JavaScript; can work with variables, operators, flow control, and functions; know the basics of data types system; think algorithmically and can analyze problems using a programmatic conceptual apparatus; and can design, develop, and improve simple JavaScript programs.',
    credlyId: '87b37e93-3087-48ff-a193-e836dc99e086',
    pdf: '/JavaScriptEssentials1.pdf'
  },
  { 
    title: 'JIS Samman Award', 
    issuer: 'JIS College of Engineering', 
    xp: '500 XP', 
    img: '/images/Achivement/jis%20samman.webp', 
    color: '#ffbd00',
    description: 'Awarded for securing 1st place in the Guitar Competition at JIS College of Engineering, recognizing exceptional musical performance and artistic talent.'
  }
]

const stats = [
  { label: 'Repos', value: '24+', icon: FaBook, color: 'text-cyber-blue' },
  { label: 'Commits', value: '840+', icon: FaCodeBranch, color: 'text-cyber-purple' },
  { label: 'Streak', value: '18 Days', icon: FaFire, color: 'text-cyber-pink' }
]

const generateContributions = () => {
  const totalDays = 20 * 7 // 20 weeks
  const grid = []
  for (let i = 0; i < totalDays; i++) {
    let count = 0
    const rand = Math.random()
    if (rand > 0.85) count = Math.floor(Math.random() * 8) + 1
    else if (rand > 0.5) count = Math.floor(Math.random() * 3) + 1
    
    const date = new Date()
    date.setDate(date.getDate() - (totalDays - i))
    
    grid.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count
    })
  }
  return grid
}

function CertDetailModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleConfetti = (e) => {
    e.stopPropagation()
    // Trigger confetti from the center of the screen with zIndex above modal (which has z-9999)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: [cert.color, '#ffffff', '#bd00ff'],
      zIndex: 100000
    })
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-[#0e0a24]/95 border border-theme-border/80 rounded-2xl p-6 md:p-8 cursor-default flex flex-col md:flex-row gap-6 shadow-2xl glass-panel text-left overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-theme-muted hover:text-theme-text text-lg cursor-pointer transition-all active:scale-90"
          title="Close"
        >
          ✕
        </button>

        {/* Left Side: Badge Display / Credly Embed */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-48">
          {cert.credlyId ? (
            <div className="relative w-[150px] h-[270px] bg-theme-card/50 rounded-lg flex items-center justify-center border border-theme-border/40 overflow-hidden shadow-inner">
              <iframe
                src={`https://www.credly.com/embedded_badge/${cert.credlyId}`}
                width="150"
                height="270"
                frameBorder="0"
                scrolling="no"
                title={`${cert.title} Badge`}
                className="w-full h-full"
              />
            </div>
          ) : cert.pdf ? (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noreferrer"
              className="w-36 h-36 rounded-xl overflow-hidden shadow-lg border border-theme-border/50 cursor-pointer image-highlight hover:scale-105 transition-transform duration-350 block relative group"
              title={cert.pdf.endsWith('.pdf') ? 'Click to view original certificate PDF' : 'Click to view patent file'}
            >
              <img
                src={cert.img}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <span className="text-[9px] font-mono text-white bg-cyber-blue px-2 py-1 rounded">
                  {cert.pdf.endsWith('.pdf') ? 'View PDF' : 'View File'}
                </span>
              </div>
            </a>
          ) : (
            <div
              className="w-36 h-36 rounded-xl overflow-hidden shadow-lg border border-theme-border/50 cursor-pointer image-highlight"
              onClick={handleConfetti}
            >
              <img
                src={cert.img}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <span className="inline-block px-2.5 py-1 rounded bg-cyber-yellow/10 text-cyber-yellow text-[10px] font-mono font-bold mt-4">
            {cert.xp} Earned
          </span>
        </div>

        {/* Right Side: Credential Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest block mb-1">
              Credential Details
            </span>
            <h4 className="text-xl md:text-2xl font-extrabold text-theme-text font-sans leading-tight">
              {cert.title}
            </h4>
            <span 
              className="text-xs font-mono font-bold block mt-1 uppercase tracking-wider" 
              style={{ color: cert.color }}
            >
              {cert.issuer}
            </span>

            <p className="text-xs md:text-sm text-theme-muted mt-4 leading-relaxed font-sans font-medium">
              {cert.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={cert.pdf || cert.img}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-cyber-blue text-white text-xs font-mono font-bold hover:bg-cyber-blue/80 active:scale-95 transition-all shadow cursor-pointer text-center"
            >
              {cert.pdf && cert.pdf.endsWith('.pdf') 
                ? 'View PDF Certificate' 
                : cert.title === 'Patent File' 
                  ? 'View Patent File' 
                  : 'View Certificate'}
            </a>
            <button
              onClick={handleConfetti}
              className="px-4 py-2 rounded-lg border border-theme-border bg-theme-card/40 hover:border-theme-text/20 text-theme-text text-xs font-mono font-bold active:scale-95 transition-all cursor-pointer"
            >
              Celebrate 🎉
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Achievements() {
  const [gridData, setGridData] = useState([])
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 })
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    setGridData(generateContributions())
  }, [])

  const triggerConfetti = (e, color) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { x, y },
      colors: [color, '#ffffff', '#bd00ff']
    })
  }

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-theme-card border border-theme-border/20'
    if (count <= 2) return 'bg-emerald-950/40 border border-emerald-950/20'
    if (count <= 4) return 'bg-emerald-800/60'
    if (count <= 6) return 'bg-emerald-600'
    return 'bg-emerald-400'
  }

  const showTooltip = (e, day) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      text: `${day.count === 0 ? 'No' : day.count} commits on ${day.date}`,
      x: rect.left + rect.width / 2 - window.scrollX,
      y: rect.top - 35 - window.scrollY
    })
  }

  return (
    <section
      id="certifications"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-yellow uppercase font-bold">
          Credentials & Activity
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          Achievements & GitHub
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Gamified Certifications (7 columns) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl text-cyber-yellow animate-pulse">
              <FaAward />
            </span>
            <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold">
              Unlocked Credentials
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certs.map((c, idx) => {
              return (
                <div
                  key={c.title}
                  onClick={(e) => {
                    triggerConfetti(e, c.color)
                    setSelectedCert(c)
                  }}
                  className="p-4 rounded-xl glass-panel border border-theme-border flex gap-4 items-center cursor-pointer hover:border-theme-text/20 select-none active:scale-[0.98] transition-all animate-float"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {c.credlyId ? (
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 image-highlight flex items-center justify-center bg-transparent relative">
                      <div className="absolute w-[150px] h-[150px] top-[-5px] flex items-center justify-center scale-[0.37] origin-top">
                        <iframe
                          src={`https://www.credly.com/embedded_badge/${c.credlyId}`}
                          width="150"
                          height="270"
                          frameBorder="0"
                          scrolling="no"
                          title={`${c.title} Badge`}
                          className="pointer-events-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 rounded-lg overflow-hidden shrink-0 image-highlight"
                    >
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <h5 className="text-xs font-bold text-theme-text truncate" title={c.title}>
                      {c.title}
                    </h5>
                    <span className="text-[9px] font-mono text-theme-muted block uppercase tracking-wider mt-0.5">
                      {c.issuer}
                    </span>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-cyber-yellow/10 text-cyber-yellow text-[9px] font-bold mt-1">
                      {c.xp}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: GitHub grid & stats (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold">
            GitHub Commits
          </h4>

          {/* Grid Box */}
          <div className="p-5 rounded-xl glass-panel border border-theme-border flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-theme-text font-bold">Arghya876</span>
              <a
                href="https://github.com/Arghya876"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-cyber-blue hover:underline"
              >
                PROFILER &gt;
              </a>
            </div>

            {/* Simulated Git Commits Grid (20 weeks) */}
            <div className="overflow-x-auto no-scrollbar">
              <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[280px]">
                {gridData.map((day, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-[1px] transition-all hover:scale-125 cursor-pointer ${getIntensityClass(
                      day.count
                    )}`}
                    onMouseEnter={(e) => showTooltip(e, day)}
                    onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-[9px] font-mono text-theme-muted">
              <span>20 weeks ago</span>
              <span>Less → More</span>
              <span>Today</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="p-3 rounded-xl border border-theme-border bg-theme-card/30 text-center">
                  <div className={`text-base flex justify-center mb-1 ${s.color}`}>
                    <Icon />
                  </div>
                  <span className="text-[9px] font-mono text-theme-muted block uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="text-sm font-bold text-theme-text block mt-0.5">
                    {s.value}
                  </span>
                </div>
              )}
            )}
          </div>

        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 px-2 py-1 rounded bg-[#0b0720]/95 border border-theme-border text-[9px] font-mono text-white pointer-events-none shadow"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Lightbox / Certificate Details Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              key="cert-detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999]"
            >
              <CertDetailModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
