import React, { useEffect, useState } from "react";

const HeroInput = () => {
  const [idea, setIdea] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const suggestions = [
    "An AI tutor for kids with ADHD...",
    "A no-code app builder for therapists...",
    "Marketing tool for freelancers...",
    "Startup accelerator for remote teams...",
    "Mental health support via text..."
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`text-center transition-opacity duration-300 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo + Headline */}
      <section className="text-center drop-shadow-s">
        <div className="flex justify-center mb-[-4px]">
          {/* Light mode logo */}
          <img
            src="/routra_logo_transparent.png"
            alt="Routra Logo Light"
            className="w-58 h-80 block dark:hidden"
          />
          {/* Dark mode logo */}
          <img
            src="/routra_white_letters.png"
            alt="Routra Logo Dark"
            className="w-58 h-80 hidden dark:block"
          />
        </div>
        <h2 className="text-3xl font-bebas tracking-wide mt-[-6px]">
          How do you want to change the world?
        </h2>
      </section>

      {/* Input Box + Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-routraPanel dark:bg-darkPanel p-4 rounded-xl shadow border border-routraBorder dark:border-gray-700 transition-colors duration-150">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full bg-transparent font-bebas tracking-wide text-routraText dark:text-white placeholder-gray-500 dark:placeholder-white/50 p-3 rounded-lg border border-routraBorder dark:border-gray-700 focus:outline-none transition-colors duration-150"
          placeholder={suggestions[placeholderIndex]}
        />
        <button
          className="bg-routraAccent hover:bg-routraAccentHover text-white font-bebas tracking-wide px-6 py-3 rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:shadow-routraAccent/40"
        >
          Generate
        </button>
      </div>
    </section>
  );
};

export default HeroInput;
