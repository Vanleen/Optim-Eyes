import HeroSection from "../components/HeroSection";
import CoupDeCoeur from "../components/CoupDeCoeur";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection /> {/* ✅ Ajout du Hero en haut */}
      <CoupDeCoeur />
    </div>
  );
};

export default Home;
