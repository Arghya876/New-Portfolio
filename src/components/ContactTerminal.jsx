import { useState, useRef, useEffect } from 'react'
import { FaTerminal, FaLinkedin, FaGithub, FaEnvelope, FaFileDownload, FaArrowRight } from 'react-icons/fa'

export default function ContactTerminal() {
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Initializing collaboration connection...', type: 'system' },
    { text: 'Access granted. Welcome, Recruiter guest@arghya.dev.', type: 'system' },
    { text: "Type 'help' to review available terminal inputs.", type: 'system' }
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)
  const isFirstRender = useRef(true)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState({ success: false, loading: false, msg: '' })

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalHistory])

  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    const cmd = terminalInput.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...terminalHistory, { text: `> ${terminalInput}`, type: 'input' }]
    
    switch (cmd) {
      case 'help':
        newHistory.push({
          text: 'Available Commands:\n  about     - Brief background description\n  projects  - Highlight key chapters\n  resume    - Trigger CV document download\n  socials   - Display LinkedIn & GitHub handles\n  clear     - Wipe command terminal history\n  neofetch  - Print system configuration statistics',
          type: 'output'
        })
        break
      case 'about':
        newHistory.push({
          text: 'Arghya Bhattacharjee - IT Graduate & MERN Developer.\nFocuses on Full-Stack MERN applications, AI vision systems, and IoT integrations.',
          type: 'output'
        })
        break
      case 'projects':
        newHistory.push({
          text: 'Featured Projects:\n  - NovaCart: MERN E-Commerce\n  - Little Guardian: IoT Smart Cradle\n  - LPG Leakage System: Patent IoT Alert\n  - Face Emotion Recognition: Deep Learning CNN',
          type: 'output'
        })
        break
      case 'resume':
        newHistory.push({ text: 'Triggering resume download... File: resume.pdf', type: 'output' })
        const link = document.createElement('a')
        link.href = './resume.pdf'
        link.download = 'Arghya_Bhattacharjee_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        break
      case 'socials':
        newHistory.push({
          text: 'LinkedIn: linkedin.com/in/arghya-bhattacharjee876\nGitHub: github.com/Arghya876\nEmail: arghyabhattacharjee876@gmail.com',
          type: 'output'
        })
        break
      case 'clear':
        setTerminalHistory([])
        setTerminalInput('')
        return
      case 'neofetch':
        newHistory.push({
          text: 'guest@arghya.dev\n----------------\nOS: React Ecosystem v19\nHost: B.Tech Information Technology\nKernel: Node.js / Vite / Tailwind v4\nUptime: 2022 - 2026 (4 Years)\nShell: Antigravity-Terminal-Shell\nDE: Framer Motion / Lenis Smooth\nIDE: VS Code\nCPU: Core MERN Processor\nMemory: 16GB Passion / 512GB Motivation',
          type: 'output'
        })
        break
      default:
        newHistory.push({
          text: `Command not found: "${cmd}". Type "help" for a list of valid operations.`,
          type: 'error'
        })
    }

    setTerminalHistory(newHistory)
    setTerminalInput('')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ success: false, loading: false, msg: 'Please populate all input fields.' })
      return
    }

    setFormStatus({ success: false, loading: true, msg: '' })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      
      setTerminalHistory(prev => [
        ...prev,
        { text: `System: Incoming message buffered from ${formData.name} (${formData.email})`, type: 'system' },
        { text: `"${formData.message.slice(0, 50)}${formData.message.length > 50 ? '...' : ''}"`, type: 'output' },
        { text: `System: Message dispatch finalized successfully.`, type: 'system' }
      ])

      setFormStatus({ success: true, loading: false, msg: 'Message sent successfully!' })
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact Form submission error:', err)
      setFormStatus({ success: false, loading: false, msg: 'Submission failed.' })
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-purple uppercase font-bold">
          Get In Touch
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-theme-text mt-2 font-sans">
          Let's Collaborate
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: retro dark CLI terminal (7 columns) */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="lg:col-span-7 rounded-xl border border-white/10 bg-[#070417] shadow-2xl flex flex-col min-h-[380px] overflow-hidden font-mono text-xs text-left cursor-text"
        >
          
          <div className="bg-[#120e28] px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
            <FaTerminal className="text-cyber-blue" />
            <span className="text-[10px] text-gray-400 tracking-wider font-bold">guest@arghya: ~ (interactive-sh)</span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto max-h-[300px] flex flex-col gap-2 no-scrollbar">
            {terminalHistory.map((item, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap leading-relaxed ${
                  item.type === 'input'
                    ? 'text-cyber-blue font-bold'
                    : item.type === 'system'
                    ? 'text-cyber-purple/80 italic'
                    : item.type === 'error'
                    ? 'text-cyber-pink font-semibold'
                    : 'text-gray-300'
                }`}
              >
                {item.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleTerminalSubmit} className="border-t border-white/5 bg-black/30 flex items-center p-3">
            <span className="text-cyber-blue font-bold mr-2 select-none">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help' or 'neofetch'..."
              className="flex-1 bg-transparent text-gray-100 focus:outline-none placeholder-gray-700 font-mono text-xs"
            />
          </form>
        </div>

        {/* Right: theme-aware standard form (5 columns) */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-xl glass-panel border border-theme-border flex flex-col justify-between">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
            
            <h4 className="text-sm font-mono tracking-widest text-theme-text uppercase font-bold mb-2">
              Message Dispatch Pad
            </h4>

            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="form-name" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
                Name
              </label>
              <input
                id="form-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-theme-bg/30 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors"
                placeholder="Steve Rogers"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="form-email" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
                Email Address
              </label>
              <input
                id="form-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-theme-bg/30 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors"
                placeholder="steve@shield.com"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1">
              <label htmlFor="form-message" className="text-[10px] font-mono text-theme-muted uppercase tracking-widest">
                Message Content
              </label>
              <textarea
                id="form-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-theme-bg/30 border border-theme-border rounded px-3 py-2 text-xs text-theme-text focus:outline-none focus:border-cyber-purple transition-colors resize-none"
                placeholder="Let's build a new project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus.loading}
              className="mt-2 w-full py-2.5 rounded bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
            >
              {formStatus.loading ? 'Dispatching...' : 'Send Message'} <FaArrowRight className="text-[10px]" />
            </button>

            {formStatus.msg && (
              <p className="text-[10px] font-mono text-center tracking-wide mt-2 text-cyber-green">
                {formStatus.msg}
              </p>
            )}
          </form>

          {/* Social Links Panel */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-theme-border text-theme-muted text-lg">
            <a href="https://www.linkedin.com/in/arghya-bhattacharjee876/" target="_blank" rel="noreferrer" className="hover:text-theme-text transition-colors" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Arghya876" target="_blank" rel="noreferrer" className="hover:text-theme-text transition-colors" title="GitHub">
              <FaGithub />
            </a>
            <a href="mailto:arghyabhattacharjee876@gmail.com" className="hover:text-theme-text transition-colors" title="Email Direct">
              <FaEnvelope />
            </a>
            <a href="./resume.pdf" download="Arghya_Bhattacharjee_Resume.pdf" className="hover:text-theme-text transition-colors" title="Download CV">
              <FaFileDownload />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
