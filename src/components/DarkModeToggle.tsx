import { useEffect, useState } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";

const DarkModeToggle = ({ onToggle }: { onToggle: () => void }) => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    onToggle();
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-105 transition"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        // currently in dark mode → show off bulb (you’re about to switch to light)
        <LightbulbOff className="w-6 h-6 text-white transition-all duration-200" />
      ) : (
        // currently in light mode → show on bulb (you’re about to switch to dark)
        <Lightbulb className="w-6 h-6 text-yellow-400 transition-all duration-200" />
      )}
    </button>
  );
};

export default DarkModeToggle;
