import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFolder, FaFolderOpen, FaFileCode, FaCircle } from 'react-icons/fa'

const files = {
  'overview.json': {
    name: 'overview.json',
    language: 'json',
    content: `{
  "role": "Web Development Intern",
  "company": "Prodigy InfoTech",
  "period": "August 2024 - September 2024",
  "location": "Remote",
  "milestones": [
    "Built dynamic frontends using core HTML, CSS, and JS",
    "Connected third-party weather REST endpoints",
    "Optimized UI responsiveness across grid structures"
  ],
  "performance": "Grade A - Completed all assigned tasks successfully"
}`
  },
  'weather-app.js': {
    name: 'weather-app.js',
    language: 'javascript',
    content: `// Weather Fetching Engine (Prodigy task deliverables)
async function getRealtimeWeather(city) {
  const API_KEY = "WEATHER_API_KEY_SECURE";
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}\`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Celsius conversion and DOM rendering
    renderWeatherWidget({
      temperature: Math.round(data.main.temp - 273.15),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed
    });
  } catch (error) {
    console.error("Failed to collect weather telemetry:", error);
  }
}`
  },
  'responsive-ui.css': {
    name: 'responsive-ui.css',
    language: 'css',
    content: `/* Fluid styling system for Prodigy Web Apps */
.dashboard-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 640px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
}`
  }
}

export default function Experience() {
  const [activeFile, setActiveFile] = useState('overview.json')
  const [isFolderOpen, setIsFolderOpen] = useState(true)

  return (
    <section
      id="experience"
      className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-24 scroll-mt-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-xs font-mono tracking-widest text-cyber-blue uppercase">
          Professional Arena
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white mt-2 font-sans">
          Work Experience
        </h3>
        <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">
          Explore my web development internship deliverables at Prodigy InfoTech by clicking files in the interactive workspace editor below.
        </p>
      </div>

      <div className="w-full rounded-xl border border-white/10 bg-black/60 shadow-[0_0_40px_rgba(3,0,20,0.8)] overflow-hidden font-mono flex flex-col md:grid md:grid-cols-12 min-h-[460px]">
        
        {/* Editor Titlebar (Across all grid cells on desktop) */}
        <div className="col-span-12 py-3 px-4 bg-dark-accent/30 border-b border-white/5 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <FaCircle className="text-cyber-pink/70 text-[10px]" />
            <FaCircle className="text-cyber-yellow/70 text-[10px]" />
            <FaCircle className="text-cyber-green/70 text-[10px]" />
            <span className="ml-3 font-sans font-medium text-gray-400">VS Code - PortfolioWorkspace</span>
          </div>
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-cyber-blue/60">
            Node.js / CSS Environment
          </span>
        </div>

        {/* Sidebar Folder Explorer (Left 3 columns) */}
        <div className="md:col-span-3 bg-dark-bg/60 border-r border-white/5 p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 select-none">
            Explorer
          </span>

          {/* Root Directory Folder */}
          <button
            onClick={() => setIsFolderOpen(!isFolderOpen)}
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-white select-none w-full text-left"
          >
            {isFolderOpen ? (
              <FaFolderOpen className="text-cyber-blue" />
            ) : (
              <FaFolder className="text-cyber-blue" />
            )}
            <span className="font-semibold">prodigy-internship</span>
          </button>

          {/* Files List */}
          {isFolderOpen && (
            <motion.div
              className="flex flex-col pl-4 gap-1 mt-1"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {Object.keys(files).map((filename) => (
                <button
                  key={filename}
                  onClick={() => setActiveFile(filename)}
                  className={`flex items-center gap-2 text-xs py-1.5 px-2 rounded w-full text-left transition-colors select-none ${
                    activeFile === filename
                      ? 'bg-cyber-blue/10 text-cyber-blue font-medium'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <FaFileCode className="text-[11px]" />
                  <span>{filename}</span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Editor Screen (Right 9 columns) */}
        <div className="md:col-span-9 flex flex-col bg-[#05021a]/85 relative">
          
          {/* File Tabs Bar */}
          <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto no-scrollbar">
            {Object.keys(files).map((filename) => (
              <button
                key={filename}
                onClick={() => setActiveFile(filename)}
                className={`flex items-center gap-2 text-xs px-4 py-2.5 border-r border-white/5 transition-all select-none whitespace-nowrap cursor-pointer ${
                  activeFile === filename
                    ? 'bg-[#05021a]/85 text-cyber-blue border-t-2 border-t-cyber-blue border-b-transparent font-medium'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <FaFileCode className="text-[10px]" />
                <span>{filename}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Code Viewer panel */}
          <div className="flex-1 p-6 overflow-y-auto no-scrollbar text-xs md:text-sm leading-relaxed text-gray-300 flex select-text">
            {/* Mock syntax coloring using custom styling loops */}
            <pre className="w-full font-mono text-left select-text whitespace-pre-wrap">
              <code>
                {files[activeFile].content.split('\n').map((line, idx) => {
                  // Basic regex styling inside JS render to create syntax highlighting look
                  let styledLine = line
                    .replace(/(const|let|var|function|async|await|return|try|catch|class|import|from)/g, '<span class="text-cyber-purple font-semibold">$1</span>')
                    .replace(/(true|false|null|console|Math|DOM)/g, '<span class="text-cyber-pink font-semibold">$1</span>')
                    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-cyber-green">$1</span>')
                    .replace(/(\/\/.+)/g, '<span class="text-gray-500 italic">$1</span>')
                    .replace(/(API_KEY|WEATHER_API_KEY_SECURE)/g, '<span class="text-cyber-yellow">$1</span>');

                  return (
                    <div key={idx} className="flex gap-4 group">
                      <span className="w-6 text-gray-600 text-right select-none pr-1 border-r border-white/5 font-mono text-[10px] md:text-xs">
                        {idx + 1}
                      </span>
                      <span
                        className="flex-1 font-mono pl-1 select-text"
                        dangerouslySetInnerHTML={{ __html: styledLine }}
                      />
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Absolute Background Ambient Glow */}
          <div className="absolute right-4 bottom-4 w-32 h-32 rounded-full bg-cyber-blue/5 blur-[40px] pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
