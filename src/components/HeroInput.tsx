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

  // Change placeholder every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`text-center space-y-0.1 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Logo */}
    <section className={`text-center transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-center animate-fadeIn mb-[-4px]">
        <img src="/routra_logo_transparent.png" alt="Routra Logo" className="w-58 h-80" />
      </div>
    <h2 className="text-3xl font-bebas tracking-wide animate-fadeIn delay-100 mt-[-6px]">
    How do you want to change the world?
    </h2>
    </section>


      {/* Input Box + Button */}
      <div className="animate-fadeIn delay-200 flex flex-col sm:flex-row items-center gap-4 bg-routraPanel p-4 rounded-xl shadow border border-routraBorder">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full bg-transparent font-bebas tracking-wide text-routraText placeholder-gray-500 p-3 rounded-lg border border-routraBorder focus:outline-none"
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
