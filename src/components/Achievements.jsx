import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { FaBook, FaCodeBranch, FaFire } from 'react-icons/fa'

const certs = [
  { title: 'JIS Samman Academic Award', issuer: 'JIS College of Eng', xp: '500 XP', img: '/images/Achivement/jis%20samman.webp', color: '#ffbd00' },
  { title: 'AI-Based Safety Patent Published', issuer: 'Patent Office India', xp: '500 XP', img: '/images/Achivement/Patent.webp', color: '#ff0055' },
  { title: 'Google Cybersecurity Certificate', issuer: 'Google Certifications', xp: '450 XP', img: '/images/google_cert.webp', color: '#4285f4' },
  { title: 'NPTEL Java Gold Medalist', issuer: 'IIT Roorkee', xp: '400 XP', img: '/images/nptel_cert.webp', color: '#00f0ff' },
  { title: 'ISRO Geospatial Technology', issuer: 'IIRS - ISRO Program', xp: '350 XP', img: '/images/isro_cert.webp', color: '#39ff14' },
  { title: 'JavaScript Essentials Cert', issuer: 'Cisco Networking Acad', xp: '300 XP', img: '/images/achievement_badge.webp', color: '#f7df1e' }
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

export default function Achievements() {
  const [gridData, setGridData] = useState([])
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 })

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
            <img src="/images/achievement_badge.webp" className="w-8 h-8 object-cover rounded-lg image-highlight" alt="" />
            <h4 className="text-sm font-mono tracking-widest text-theme-muted uppercase font-bold">
              Unlocked Credentials
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certs.map((c, idx) => {
              return (
                <div
                  key={c.title}
                  onClick={(e) => triggerConfetti(e, c.color)}
                  className="p-4 rounded-xl glass-panel border border-theme-border flex gap-4 items-center cursor-pointer hover:border-theme-text/20 select-none active:scale-[0.98] transition-all animate-float"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div
                    className="w-14 h-14 rounded-lg overflow-hidden shrink-0 image-highlight"
                  >
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
    </section>
  )
}
