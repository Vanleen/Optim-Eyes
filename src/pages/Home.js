import HeroSection from "../components/HeroSection";
import CoupDeCoeur from "../components/CoupDeCoeur";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection /> {/* ✅ Ajout du Hero en haut */}
      <CoupDeCoeur />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded-full shadow-lg"
      >
        ↑
      </button>
    </div>
  );
};

export default Home;
