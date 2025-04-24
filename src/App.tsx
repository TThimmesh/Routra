import HeroInput from "./components/HeroInput";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-routraBg text-routraText font-sans scrollbar-thin scrollbar-thumb-routraAccent scrollbar-track-transparent">
      
      {/* Main Content */}
      <main className="py-24 px-6 max-w-2xl mx-auto w-full">
        <HeroInput />
      </main>

      {/* Footer */}
      <footer className="text-sm text-black/50 font-bebas tracking-wide text-center pb-6">
        Built with <span className="text-routraAccent">♥</span> by Taylor Thimmesh
      </footer>
    </div>
  );
}

export default App;
