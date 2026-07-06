import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaMicrochip } from 'react-icons/fa'

const journeyData = [
  {
    year: '2022 - 2026',
    title: 'B.Tech in Information Technology',
    subtitle: 'JIS College of Engineering (CGPA 8.1)',
    icon: FaGraduationCap,
    desc: 'Covered algorithms, database modeling, and software engineering. Discovered passion for scripting and full-stack development.',
    color: 'text-cyber-purple border-cyber-purple'
  },
  {
    year: '2024 (Summer)',
    title: 'Web Developer Intern',
    subtitle: 'Prodigy InfoTech',
    icon: FaBriefcase,
    desc: 'Coded responsive user interfaces, embedded live REST endpoints (OpenWeatherMap API), and optimized grid dashboards.',
    color: 'text-cyber-blue border-cyber-blue'
  },
  {
    year: '2024 (Winter)',
    title: 'Patent Co-Holder Published',
    subtitle: 'AI-Based Safety & Gas Alert System',
    icon: FaMicrochip,
    desc: 'Co-invented and published a patent connecting gas leakage hardware sensors with Twilio WhatsApp API warnings via Python.',
    color: 'text-cyber-pink border-cyber-pink'
  }
]

export default function Journey() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center']
  })

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-purple uppercase font-bold">
          Bio & Timeline
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          My Journey
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Biography & Academics (5 columns) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 image-highlight">
              <img
                src="/images/laptop_pic.webp"
                alt="Workspace Laptop"
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-theme-text">
              Professional Summary
            </h4>
          </div>

          <p className="text-sm text-theme-muted leading-relaxed mt-3">
            Recent B.Tech IT graduate with strong fundamentals in MERN stack web applications, REST APIs, and database design. I focus on developing clean, responsive frontend pages and modular backend endpoints.
          </p>

          <p className="text-sm text-theme-muted leading-relaxed mt-3">
            Through academic research and hands-on projects, I co-invented a published patent for AI-based hazard detection. Dedicated to creating robust software interfaces for businesses and automated systems.
          </p>

          {/* Academics Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="p-4 rounded-xl border border-theme-border bg-theme-card/30 text-center">
              <span className="text-xl font-extrabold text-theme-text">8.1</span>
              <span className="text-[10px] font-mono text-theme-muted block mt-0.5 uppercase tracking-wider">B.Tech CGPA</span>
            </div>
            <div className="p-4 rounded-xl border border-theme-border bg-theme-card/30 text-center">
              <span className="text-xl font-extrabold text-theme-text">84.4%</span>
              <span className="text-[10px] font-mono text-theme-muted block mt-0.5 uppercase tracking-wider">Higher Sec</span>
            </div>
          </div>
        </div>

        {/* Right Column: Milestones Timeline (7 columns) */}
        <div className="lg:col-span-7 pl-6 md:pl-12 relative border-l border-theme-border/60 ml-4 lg:ml-0 pt-2">
          {/* Scroll guided line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-purple to-cyber-blue origin-top"
            style={{ scaleY, height: '100%' }}
          />

          <div className="flex flex-col gap-10">
            {journeyData.map((node, idx) => {
              const Icon = node.icon
              return (
                <motion.div
                  key={idx}
                  className="relative pl-6 group text-left"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Bullet */}
                  <div className="absolute left-[-7px] top-1.5 w-3.5 h-3.5 rounded-full bg-theme-bg border-2 border-theme-border flex items-center justify-center group-hover:border-cyber-blue transition-colors">
                    <div className="w-1 h-1 rounded-full bg-cyber-purple group-hover:bg-cyber-blue" />
                  </div>

                  <span className="text-[10px] font-mono text-cyber-blue font-bold tracking-widest uppercase">
                    {node.year}
                  </span>
                  
                  <h4 className="text-base font-extrabold text-theme-text mt-0.5 flex items-center gap-2">
                    <Icon className="text-theme-muted group-hover:text-cyber-blue transition-colors" /> {node.title}
                  </h4>
                  
                  <span className="text-xs font-mono text-theme-muted block italic mt-0.5">
                    {node.subtitle}
                  </span>
                  
                  <p className="text-xs md:text-sm text-theme-muted mt-2 leading-relaxed">
                    {node.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
