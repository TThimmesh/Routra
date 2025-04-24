import React, { useState } from "react";

const HeroInput = () => {
  const [idea, setIdea] = useState("");

  return (
    <section className="text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center animate-fadeIn">
        <img src="/routra_logo_transparent.png" alt="Routra Logo" className="w-58 h-80" />
      </div>

      {/* Headline */}
      <h2 className="text-3xl font-semibold tracking-tight animate-fadeIn delay-100">
        What does your startup want to be?
      </h2>

      {/* Input Box + Button */}
      <div className="animate-fadeIn delay-200 flex flex-col sm:flex-row items-center gap-4 bg-routraPanel p-4 rounded-xl shadow border border-routraBorder">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full bg-transparent text-routraText placeholder-gray-500 p-3 rounded-lg border border-routraBorder focus:outline-none"
          placeholder="An AI tutor for kids with ADHD..."
        />
        <button
          className="bg-routraAccent hover:bg-routraAccentBold text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Generate
        </button>
      </div>
    </section>
  );
};

export default HeroInput;
