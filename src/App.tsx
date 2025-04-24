import "./GradientBackground.css";
import HeroInput from "./components/HeroInput";

function App() {
  return (
      <div className="min-h-screen text-routraText font-sans relative overflow-hidden">

      {/* ✅ External CSS-based background gradient */}
      <div className="gradient-bg"></div>

      <main className="py-24 px-6 max-w-2xl mx-auto">
        <HeroInput />
      </main>
    </div>
  );
}

export default App;
