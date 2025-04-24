import { useEffect, useState } from "react";

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

    // Call fade out/in trigger
    onToggle();
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition"
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;
