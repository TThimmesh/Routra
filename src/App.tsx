import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HeroInput from "./components/HeroInput";
import ConstellationBackground from "./components/ConstellationBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import Editor from "./pages/Editor";
import { useState } from "react";

function App() {
  const [showHero, setShowHero] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleThemeSwitch = () => {
    setShowHero(false);
    setTimeout(() => setShowHero(true), 250);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between font-sans overflow-hidden bg-routraBg text-routraText dark:bg-darkBg dark:text-darkText transition-colors duration-150">
      
      {/* 🌙 Dark Mode Toggle */}
      <DarkModeToggle onToggle={handleThemeSwitch} />

      {/* ✨ Star Constellation Background only on Home */}
      {location.pathname === "/" && (
        <ConstellationBackground />
      )}

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <main className="relative z-10 py-24 px-6 max-w-2xl mx-auto w-full transition-colors duration-150">
              {showHero && <HeroInput />}
            </main>
          }
        />

        {/* Editor Page */}
        <Route path="/editor" element={<Editor />} />
      </Routes>

      {/* Footer only on Home */}
      {location.pathname === "/" && (
        <footer className="relative z-10 text-sm text-black/50 dark:text-white/40 font-bebas tracking-wide text-center pb-6 transition-colors duration-150">
          Built with <span className="text-routraAccent">♥</span> by Taylor Thimmesh
        </footer>
      )}
    </div>
  );
}

export default App;
