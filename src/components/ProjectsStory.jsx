import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaExclamationTriangle, FaCheckCircle, FaLaptopCode, FaChild, FaFireExtinguisher, FaSmile, FaUserShield } from 'react-icons/fa'

const projects = [
  {
    chapter: '01',
    title: 'NovaCart',
    tagline: 'MERN Stack E-Commerce Platform',
    icon: FaLaptopCode,
    image: '/images/Projects/Novacart%20Home.webp',
    problem: 'Traditional commerce platforms suffer from sluggish database lookups, insecure checkout authorization mechanisms, and lack streamlined dashboards for business managers.',
    solution: 'Programmed an end-to-end e-commerce software deck. Designed fast REST routes using Node.js & Express, secured logins with JWT payloads, optimized MongoDB schemas, and integrated cart/order modules with a React control dashboard.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    github: 'https://github.com/Arghya876/NovaCart',
    demo: 'https://novacart-arghya876.vercel.app/',
    accent: 'text-cyber-purple',
    badge: 'MERN STACK LIVE'
  },
  {
    chapter: '02',
    title: 'Little Guardian',
    tagline: 'Smart Baby Cradle Using IoT & AI',
    icon: FaChild,
    image: '/images/Projects/Little%20Guardian%20Dashboard.webp',
    problem: 'Infant sleep monitors are usually limited to simple audio streaming, failing to recognize environmental anomalies or dangerous shifts in an infant sleeping state.',
    solution: 'Designed an automated smart cradle system utilizing IoT sensors for real-time telemetry (humidity, moisture, crying sounds). Managed database storage using MongoDB and a Java Spring Boot backend, and connected Firebase for push alerts.',
    tech: ['Java', 'Spring Boot', 'Firebase', 'MongoDB', 'IoT Sensors'],
    github: 'https://github.com/Arghya876/Little-Guardian',
    demo: '#',
    accent: 'text-cyber-blue',
    badge: 'IOT & SPRING BOOT'
  },
  {
    chapter: '03',
    title: 'AI-Based LPG Leakage & Fire Alert',
    tagline: 'Patent Published Invention',
    icon: FaFireExtinguisher,
    image: '/images/Achivement/Patent.webp',
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
    image: '/images/Projects/Little%20Guardian%20Emotion%20Detection.webp',
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
    image: '/images/Projects/Little%20Guardian%20Object%20Detection.webp',
    problem: 'Security surveillance footage records maskings or head coverings but fails to trigger alerts when intruders intentionally cover security camera scopes.',
    solution: 'Coded a computer vision program utilizing OpenCV to detect prolonged face obstructions. Integrated a Python timer loop that fires immediate alert signals and snapshot logs via Twilio API straight to security WhatsApp groups.',
    tech: ['Python', 'OpenCV', 'Twilio API', 'Computer Vision'],
    github: 'https://github.com/Arghya876/Face-Obstruction-Detection',
    demo: '#',
    accent: 'text-cyber-green',
    badge: 'COMPUTER VISION'
  }
]

export default function ProjectsStory() {
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
          Featured Chapters
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
              {/* Text Layout (Left 7 columns) */}
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

                  {/* Problem & Solution block */}
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

                {/* Tech Pills & Actions */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[10px] font-mono tracking-wider border border-theme-border px-3.5 py-2 rounded bg-theme-card/30 hover:bg-cyber-blue/15 text-theme-text transition-all cursor-pointer"
                    >
                      <FaGithub /> CODEBASE
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[10px] font-mono tracking-wider border border-theme-border px-3.5 py-2 rounded bg-theme-card/30 hover:bg-cyber-purple/15 text-theme-text transition-all cursor-pointer"
                      >
                        <FaExternalLinkAlt /> LIVE DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Graphic Display Panel (Right 5 columns) */}
              <div className="lg:col-span-5 flex items-center justify-center min-h-[200px] lg:min-h-0">
                <div className="w-full h-full min-h-[220px] rounded-xl overflow-hidden relative group/img image-highlight">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>

            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
