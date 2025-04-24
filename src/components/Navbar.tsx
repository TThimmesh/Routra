import React from "react";

const Navbar = () => {
  return (
    <header className="bg-routraPanel shadow-sm border-b border-routraBorder p-6 flex justify-center">
      <div className="flex items-center gap-3">
        <img src="/Routra_Logo_V1.png" alt="Routra Logo" className="w-8 h-10" />
        <span className="text-xl font-semibold text-routraText"></span>
      </div>
    </header>
  );
};

export default Navbar;