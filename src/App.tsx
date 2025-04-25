import React, { useState } from "react";
import HeroInput from "./components/HeroInput";
import ConstellationBackground from "./components/ConstellationBackground";
import DarkModeToggle from "./components/DarkModeToggle";
// import RoadmapEditor from "./components/RoadmapEditor"; // for full editing later

function App() {
  const [showHero, setShowHero] = useState(true);
  const [roadmapData, setRoadmapData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleThemeSwitch = () => {
    setShowHero(false);
    setTimeout(() => setShowHero(true), 250);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between font-sans overflow-hidden bg-routraBg text-routraText dark:bg-darkBg dark:text-darkText transition-colors duration-150">
      
      {/* 🌙 Dark Mode Toggle */}
      <DarkModeToggle onToggle={handleThemeSwitch} />

      {/* ✨ Star Constellation Background */}
      <ConstellationBackground />

      {/* Main content above background */}
      <main className="relative z-10 py-24 px-6 max-w-2xl mx-auto w-full transition-colors duration-150">
        {showHero && <HeroInput setRoadmapData={setRoadmapData} />}

        {/* Start Editing button — placed closer */}
        {roadmapData.length > 0 && !isEditing && (
          <div className="flex justify-center mt-3">
            <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-3 bg-routraAccent hover:bg-routraAccentHover text-white font-bebas tracking-wide text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            Start Editing
            </button>
          </div>
        
        )}
      </main>

      {/* Editor placeholder */}
      {isEditing && (
        <div className="relative z-10 font-bebas text-center py-10">
          🚧 Roadmap Editor Coming Soon
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-sm text-black/50 dark:text-white/40 font-bebas tracking-wide text-center pb-6 transition-colors duration-150">
        Built with <span className="text-routraAccent">♥</span> by Taylor Thimmesh
      </footer>
    </div>
  );
}

export default App;
