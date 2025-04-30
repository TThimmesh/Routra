import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { demoRoadmaps } from "../utils/demoRoadmaps";
import { convertRoadmapJsonToFlow } from "../utils/convertRoadmapJsonToFlow";

const HeroInput: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleGenerate = () => {
    if (!selectedPrompt) return;

    const demo = demoRoadmaps[selectedPrompt];
    if (demo) {
      const { nodes, edges } = convertRoadmapJsonToFlow(demo, selectedPrompt);
      navigate("/editor", {
        state: {
          nodes,
          edges,
          ideaText: selectedPrompt,
          isDemo: true,
        },
      });
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
          <img
            src="/routra_logo_transparent.png"
            alt="Routra Logo Light"
            className="w-58 h-80 block dark:hidden"
          />
          <img
            src="/routra_white_letters.png"
            alt="Routra Logo Dark"
            className="w-58 h-80 hidden dark:block"
          />
        </div>
        <h2 className="text-3xl font-bebas tracking-wide mt-[-6px]">
          Test Drive a Startup Idea
        </h2>
      </section>

      {/* Dropdown + Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-routraPanel dark:bg-darkPanel p-4 rounded-xl shadow border border-routraBorder dark:border-gray-700 transition-colors duration-150">
        <select
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(e.target.value)}
          className="w-full bg-routraPanel dark:bg-darkPanel font-bebas tracking-wide text-lg text-routraText dark:text-white p-3 rounded-lg border-2 border-routraAccent focus:outline-none focus:ring-2 focus:ring-routraAccent transition-colors duration-200 shadow-sm"
        >
          <option value="">Select a demo startup idea...</option>
          {Object.keys(demoRoadmaps).map((prompt) => (
            <option key={prompt} value={prompt} className="text-black dark:text-white">
              {prompt}
            </option>
          ))}
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading || !selectedPrompt}
          className={`${
            loading || !selectedPrompt
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-routraAccent hover:bg-routraAccentHover"
          } text-white font-bebas px-6 py-3 rounded-lg transition transform ${
            !loading ? "hover:scale-105 hover:shadow-lg hover:shadow-routraAccent/40" : ""
          }`}
        >
          {loading ? (
            <div className="flex gap-1 items-center justify-center">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce [animation-delay:0.1s]">•</span>
              <span className="animate-bounce [animation-delay:0.2s]">•</span>
            </div>
          ) : (
            "Generate"
          )}
        </button>
      </div>
    </section>
  );
};

export default HeroInput;
