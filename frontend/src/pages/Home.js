import HeroSection from "../components/HeroSection";
import CoupDeCoeur from "../components/CoupDeCoeur";
import ConsultationDomicile from "../components/ConsultationDomicile";


const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection /> {/* ✅ Ajout du Hero en haut */}
      <CoupDeCoeur />
      <ConsultationDomicile />
    </div>
  );
};

export default Home;
