import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { FiUser, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import logo from "../assets/images/logo.svg";
import HeroCarousel from "./HeroCarousel";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        style={{ height: "61.14px", padding: "10px 50px" }}
      >
        {/* Conteneur principal */}
        <div className="flex items-center justify-between">
          {/* Logo et slogan */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-[55.8px]" />
            <span
              className="text-base text-gray-600 font-normal"
              style={{ fontFamily: "Telegraf" }}
            >
              TOUT DEVIENT PLUS CLAIR
            </span>
          </div>

          {/* Barre de recherche */}
          <div className="flex-grow mx-6">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm border-opacity-50"
            />
          </div>

          {/* Icônes utilisateur */}
          <div className="flex gap-4 text-xl text-black">
            <FiUser className="cursor-pointer hover:text-blue-600" />
            <FiHeart className="cursor-pointer hover:text-blue-600" />
            <FiShoppingCart className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>

        {/* Navigation et bouton RDV */}
        <div
          className="flex justify-center items-center px-6 py-2 relative"
          style={{ height: "55.8px" }}
        >
          <nav
            className="flex gap-8 text-[16px] font-normal"
            style={{ fontFamily: "Poppins", fontWeight: "400" }}
          >
            <Link to="/" className="text-black hover:text-blue-600">
              Accueil
            </Link>
            <Link to="/services" className="text-black hover:text-blue-600">
              Services
            </Link>
            <Link to="/contact" className="text-black hover:text-blue-600">
              Contact
            </Link>
          </nav>
          {/* Bouton Prendre RDV */}
          <div className="absolute right-6">
            <Button
              className={`px-6 py-2 text-sm font-semibold rounded-full border transition-all duration-300 border-opacity-50 ${
                isScrolled
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border border-black"
              }`}
            >
              Prendre RDV
            </Button>
          </div>
        </div>
      </header>

      {/* Bandeau promotionnel (reste bien positionné) */}
      {showBanner && (
        <motion.div
          className="fixed top-[118px] left-0 w-full flex justify-center items-center py-2 px-4 text-[0.85rem] bg-gray-100 text-black relative text-center z-40"
          whileHover={{ scale: 1.02 }}
        >
          <Link to="/offre">2 paires de lunettes pour 0 €</Link>
          <FiX
            className="absolute right-4 cursor-pointer text-xl"
            onClick={() => setShowBanner(false)}
            aria-label="Fermer le bandeau"
          />
        </motion.div>
      )}

      {/* Section Hero avec carrousel (position corrigée) */}
      <section className={`transition-all duration-300 ${showBanner ? "mt-[123px]" : "mt-[118px]"}`}>
        <HeroCarousel />
      </section>
    </>
  );
};

export default Header;
