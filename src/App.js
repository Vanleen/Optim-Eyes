import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} /> {/* <-- Ajout de la page Connexion */}
          <Route path="/signup" element={<Signup />} /> {/* <-- Ajout de la page Inscription */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
