import React, { useEffect, useState } from "react";
import axios from "axios";

// Define props for the component
type HeroInputProps = {
  setRoadmapData: React.Dispatch<React.SetStateAction<any[]>>;
};

const HeroInput: React.FC<HeroInputProps> = ({ setRoadmapData }) => {
  const [idea, setIdea] = useState<string>("");
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const suggestions: string[] = [
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

  const handleGenerate = async () => {
    if (!idea) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/roadmap", {
        idea: idea
      });

      if (response.data.roadmap) {
        setRoadmapData(response.data.roadmap);
      } else {
        console.warn("No roadmap returned from backend.");
      }
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

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
          onClick={handleGenerate}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-routraAccent hover:bg-routraAccentHover"
          } text-white font-bebas tracking-wide px-6 py-3 rounded-lg transition transform ${
            loading ? "" : "hover:scale-105 hover:shadow-lg hover:shadow-routraAccent/40"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </section>
  );
};

export default HeroInput;
