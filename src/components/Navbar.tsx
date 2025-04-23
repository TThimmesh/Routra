import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/routra-logo.png"
          alt="Routra Logo"
          className="w-2 h-2" // <- resize logo here
        />
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Routra</h1>
      </div>
      <button className="md:hidden text-gray-600 text-2xl focus:outline-none">
        ☰
      </button>
    </header>
  );
};

export default Navbar;


