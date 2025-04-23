import React, { useState } from "react";

const HeroInput = () => {
  const [idea, setIdea] = useState("");

  return (
    <section className="text-center space-y-6">
      <h2 className="text-3xl font-semibold text-white tracking-tight">
        What is your next big idea?
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full p-3 rounded-lg bg-routraCard text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-routraPurple transition"
          placeholder="An AI tutor for kids with ADHD..."
        />
        <button
          className="bg-routraPurple hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Generate
        </button>
      </div>
    </section>
  );
};

export default HeroInput;
