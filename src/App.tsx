import React from "react";
import Navbar from "./components/Navbar";
import HeroInput from "./components/HeroInput";

function App() {
  return (
    <div className="min-h-screen bg-routraGray text-white font-sans">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto space-y-10">
        <HeroInput />
      </main>
    </div>
  );
}

export default App;
