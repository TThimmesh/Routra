import HeroInput from "./components/HeroInput";
import ConstellationBackground from "./components/ConstellationBackground";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-routraBg text-routraText font-sans overflow-hidden">
      
      {/* ✨ Star Constellation Background */}
      <ConstellationBackground />

      {/* Main content */}
      <main className="relative z-10 py-24 px-6 max-w-2xl mx-auto w-full">
        <HeroInput />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-sm text-black/50 font-bebas tracking-wide text-center pb-6">
        Built with <span className="text-routraAccent">♥</span> by Taylor Thimmesh
      </footer>
    </div>
  );
}

export default App;
