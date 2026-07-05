import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Skills from './components/Skills'
import ProjectsStory from './components/ProjectsStory'
import Achievements from './components/Achievements'
import Reviews from './components/Reviews'
import ContactTerminal from './components/ContactTerminal'

function App() {
  // Force scroll to top and disable auto-scroll restoration on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text overflow-x-hidden stars-bg grid-bg selection:bg-cyber-purple selection:text-white transition-colors duration-300">
      
      {/* Background radial glowing gradients for cosmic depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyber-purple/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-cyber-blue/10 to-transparent blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-cyber-pink/5 to-transparent blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <Journey />
        <Skills />
        <ProjectsStory />
        <Achievements />
        <Reviews />
        <ContactTerminal />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 w-full border-t border-theme-border text-center text-xs text-theme-muted bg-theme-card/30 backdrop-blur-md">
        <p>© 2026 Arghya Bhattacharjee. All rights reserved.</p>
        <p className="mt-1 text-[10px] text-cyber-blue/50">Built with React.js, Vite, Tailwind CSS, MongoDB, and Express.</p>
      </footer>
    </div>
  )
}

export default App
