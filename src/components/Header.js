import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { FiUser, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import logo from "../assets/images/logo.svg";
import HeroCarousel from "./HeroCarousel";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50 && scrollTop > lastScrollTop);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md h-[90px]"
            : "bg-transparent h-[61.14px]"
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
      </header>

      {/* Navigation */}
      <div
        className={`fixed top-[71.14px] left-0 w-full flex justify-center items-center px-5 py-2 transition-transform duration-300 bg-white z-40 ${
          isScrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <nav
          className="flex gap-8 text-[16px] font-normal"
          style={{ fontFamily: "Poppins", fontWeight: "400" }}
        >
          <Link to="/" className="text-black hover:text-blue-600">
            Optique
          </Link>
          <Link to="/services" className="text-black hover:text-blue-600">
            Solaire
          </Link>
          <Link to="/contact" className="text-black hover:text-blue-600">
            Nos verres
          </Link><Link to="/contact" className="text-black hover:text-blue-600">
            Examen de vue gratuit
          </Link>
        </nav>
      </div>

      {/* Bouton Prendre RDV (toujours visible) */}
      <div
        className={`fixed top-[71.14px] right-6 z-50 transition-all duration-300 px-6 py-2 text-sm font-semibold rounded-full border ${
          isScrolled
            ? "bg-[#0077B6] text-white border-[#0077B6]"
            : "bg-white text-black border border-black"
        }`}
      >
        <Button
          className={`px-1 py-0.5 text-sm font-semibold rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#0077B6] text-white border-[#0077B6]"
              : "bg-white text-black border-transparent"
          }`}
        >
          Prendre RDV
        </Button>
      </div>

      {/* Bandeau promotionnel (reste bien positionné) */}
      {showBanner && (
        <motion.div
          className={`fixed top-[118px] left-0 w-full flex justify-center items-center py-2 px-4 text-[0.85rem] bg-gray-100 text-black relative text-center z-30 transition-transform duration-300 ${
            isScrolled
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
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
      <section
        className={`transition-all duration-300 ${
          showBanner ? "mt-[123px]" : "mt-[118px]"
        }`}
      >
        <HeroCarousel />
      </section>
    </>
  );
};

export default Header;
