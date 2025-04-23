import React from "react";

const Navbar = () => {
  return (
    <header className="bg-purple-800 shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/routra-logo.png"
          alt="Routra Logo"
          className="w-19 h-20" // <- resize logo here
        />
        <h1 className="text-xl font-bold text-white">Routra</h1>
      </div>
      <button className="md:hidden text-gray-600 text-2xl focus:outline-none">
        ☰
      </button>
    </header>
  );
};

export default Navbar;


