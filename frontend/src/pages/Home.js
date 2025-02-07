import HeroSection from "../components/HeroSection";
import CoupDeCoeur from "../components/CoupDeCoeur";
import ConsultationDomicile from "../components/ConsultationDomicile";
import FeatureComingSoon from "../components/FeatureComingSoon"; 

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection /> {/* ✅ Ajout du Hero en haut */}
      <CoupDeCoeur />
      <ConsultationDomicile />
      <FeatureComingSoon />
    </div>
  );
};

export default Home;
