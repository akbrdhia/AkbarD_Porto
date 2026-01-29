import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERSONAL_INFO } from "../constants/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { Monitor, Code2, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import WarpBackground from "../components/web/WarpBackground";

const ModeSelectionPage = () => {
  const { setLoading, setViewMode } = usePortfolio();
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);
  const [isEntering, setIsEntering] = useState(false);

  const handleSelectMode = (mode) => {
    if (isEntering) return;
    setSelectedMode(mode);
  };

  const handleExecute = () => {
    if (!selectedMode || isEntering) return;
    
    setIsEntering(true);
    
    // Slight delay to simulate loading/rendering process
    setTimeout(() => {
      sessionStorage.setItem("portfolio_visited", "true");
      localStorage.setItem("portfolio_mode", selectedMode);
      
      setViewMode(selectedMode);
      setLoading(false);

      if (selectedMode === 'web') navigate('/web');
      else if (selectedMode === 'ide') navigate('/ide');
    }, 2800);
  };

  return (
    <div className="min-h-screen font-body overflow-x-hidden flex flex-col antialiased selection:bg-accent-green selection:text-black relative">
      <SEO 
        title="Experience Selection" 
        description="Choose your viewing experience: a modern Web Developer perspective or an interactive Android Studio IDE environment."
      />

      <WarpBackground active={isEntering} />

      <header className="fixed top-0 w-full z-10 mix-blend-difference text-white p-4 md:p-6 flex justify-between items-center pointer-events-none">
        <div className="font-mono text-xs md:text-sm tracking-tighter border border-white px-2 py-1">
          {`{ ${PERSONAL_INFO.username.toUpperCase()} }`}
        </div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_#22c55e]"></span>
          System Online
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row h-screen w-full relative">
        {/* IDE MODE SIDE */}
        <div 
          className={`w-full md:w-1/2 h-1/2 md:h-full bg-white/85 md:bg-white/80 text-black relative group transition-all duration-500 hover:flex-grow-[1.2] flex flex-col justify-center items-center border-b-[6px] md:border-b-0 md:border-r-[6px] border-black overflow-hidden cursor-pointer ${selectedMode === 'ide' ? 'md:flex-grow-[1.3] ring-inset ring-[12px] ring-black' : ''} ${isEntering ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'}`}
          onClick={() => handleSelectMode('ide')}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden select-none">
            <pre className="font-mono text-[10px] leading-tight p-4">
{`class Developer extends Human {
  constructor() {
    this.coffee = true;
    this.bugs = 0; // hopefully
  }
  
  explore() {
    return "IDE_MODE";
  }
}`}
            </pre>
            <div className="absolute -right-10 -bottom-10 text-9xl font-display opacity-10 rotate-12">
              &lt;/&gt;
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center p-6">
            <div className="border-[4px] border-black p-4 mb-6 shadow-brutal transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none bg-white">
              <Code2 className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-2 text-stretched leading-none">
              IDE<br/>MODE
            </h2>
            <p className="font-mono text-[10px] md:text-xs max-w-[220px] border-l-2 border-black pl-3 text-left mt-4 uppercase font-bold">
              Terminal Access.<br/>
              File Tree Navigation.<br/>
              Interactive Editor.
            </p>
            
            <div className={`mt-8 transition-all duration-300 ${selectedMode === 'ide' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="bg-black text-white font-mono font-bold py-2 px-6 uppercase tracking-widest text-[10px] border-2 border-black">
                {selectedMode === 'ide' ? 'SELECTED' : 'SELECT'}
              </div>
            </div>
          </div>
          
          <div className="absolute top-16 left-4 font-mono text-[10px] font-bold border border-black px-2 py-0.5">
            01
          </div>
        </div>

        {/* WEB MODE SIDE */}
        <div 
          className={`w-full md:w-1/2 h-1/2 md:h-full bg-black/60 md:bg-black/30 text-white relative group transition-all duration-500 hover:flex-grow-[1.2] flex flex-col justify-center items-center overflow-hidden cursor-pointer ${selectedMode === 'web' ? 'md:flex-grow-[1.3] ring-inset ring-[12px] ring-white' : ''} ${isEntering ? 'translate-x-[100%] opacity-0' : 'translate-x-0 opacity-100'}`}
          onClick={() => handleSelectMode('web')}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black select-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3C/g%3E%3C/svg%3E')` }}></div>
            <div className="absolute -left-10 -top-10 text-9xl font-display opacity-10 -rotate-12 text-gray-500">
              WWW
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center p-6">
            <div className="border-[4px] border-white p-4 mb-6 shadow-brutal-white transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none bg-black">
              <Monitor className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-2 text-stretched leading-none text-white">
              WEB<br/>MODE
            </h2>
            <p className="font-mono text-[10px] md:text-xs max-w-[220px] border-r-2 border-white pr-3 text-right mt-4 uppercase text-gray-400 font-bold">
              Brutalist UI.<br/>
              Bold Typography.<br/>
              Modern Experience.
            </p>

            <div className={`mt-8 transition-all duration-300 ${selectedMode === 'web' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="bg-white text-black font-mono font-bold py-2 px-6 uppercase tracking-widest text-[10px] border-2 border-white">
                {selectedMode === 'web' ? 'SELECTED' : 'SELECT'}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-16 right-4 font-mono text-[10px] font-bold border border-white px-2 py-0.5">
            02
          </div>
        </div>

        {/* Center Text Overlap */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference hidden md:block">
          <h1 className={`font-display text-[8vw] leading-none text-white whitespace-nowrap select-none uppercase tracking-tighter transition-all duration-700 ${isEntering ? 'scale-[5] opacity-0' : 'scale-100 opacity-20'}`}>
            {isEntering ? 'WARP SPEED' : 'EXPLORE'}
          </h1>
        </div>
      </main>

      {/* Execution Button */}
      <div className="fixed bottom-12 w-full flex justify-center z-40 pointer-events-none">
        <div className={`pointer-events-auto transition-all duration-300 transform ${selectedMode ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button 
            onClick={handleExecute}
            disabled={!selectedMode || isEntering}
            className="group relative bg-accent-green border-[4px] border-black shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1 transition-all px-8 py-4 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-display text-xl md:text-2xl uppercase tracking-wider text-black">
              {isEntering ? 'LOADING...' : 'Start Experience'}
            </span>
            {!isEntering && <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-2 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-4 w-full flex justify-between px-6 z-50 text-[9px] font-mono uppercase mix-blend-difference text-white pointer-events-none">
        <span className="hidden sm:inline">Based in Bogor, IDN</span>
        <span>© {new Date().getFullYear()} {PERSONAL_INFO.username}</span>
        <span className="hidden sm:inline">Mode: {selectedMode ? selectedMode.toUpperCase() : 'NULL'}</span>
      </footer>
    </div>
  );
};

export default ModeSelectionPage;
