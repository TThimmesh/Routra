import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-blue-600 text-white p-4 rounded shadow text-lg">
          Hello Routra 👋
        </div>
      </main>
    </div>
  );
}

export default App;
