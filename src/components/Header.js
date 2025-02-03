import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiMenu,
  FiCalendar,
} from "react-icons/fi";
import logo from "../assets/images/logo.svg";
import HeroCarousel from "./HeroCarousel";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }

      setIsScrolled(scrollTop > 50);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      {/* Header Principal */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md h-[90px]"
            : "bg-transparent h-[61.14px]"
        }`}
        style={{ padding: "10px 50px" }}
      >
        <div className="flex items-center justify-between">
          {/* Menu Burger bien collé à gauche */}
          <button
            className="md:hidden ml-[-35px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo et Slogan bien alignés et taille inchangée */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-[55.8px]" />
            <span
              className="text-[0.8rem] font-bold md:text-base md:font-normal text-gray-600"
              style={{ fontFamily: "Telegraf" }}
            >
              TOUT DEVIENT PLUS CLAIR
            </span>
          </div>

          {/* Barre de recherche entre le slogan et les icônes en Desktop */}
          <div className="flex-grow mx-6 hidden md:block">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm border-opacity-50"
            />
          </div>

          {/* Barre de recherche en Mobile sous le logo */}
          {showSearch && (
            <div className="md:hidden fixed top-[89.14px] left-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-300 z-40">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          )}

          {/* Icônes utilisateur (Desktop) et Icône Calendrier seule en Mobile */}
          <div className="flex items-center">
            {/* Desktop : Icônes utilisateur */}
            <div className="hidden md:flex gap-4 text-xl text-black">
              <FiUser className="cursor-pointer hover:text-blue-600" />
              <FiHeart className="cursor-pointer hover:text-blue-600" />
              <FiShoppingCart className="cursor-pointer hover:text-blue-600" />
            </div>

            {/* Mobile : Icône Calendrier seule bien collée à droite */}
            <button className="md:hidden mr-[-35px]">
              <FiCalendar size={24} className="text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Bouton Prendre RDV (UNIQUEMENT en Desktop) */}
      <div
        className={`hidden md:block fixed top-[95.14px] right-6 z-50 transition-all duration-300 px-6 py-2 text-sm font-semibold rounded-full border ${
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

      {/* Bandeau promo SOUS la barre de recherche */}
      {showBanner && (
        <motion.div
          className="fixed top-[145px] left-0 w-full flex justify-center items-center py-2 px-4 text-[0.85rem] bg-gray-100 text-black relative text-center z-30"
          animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -50 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Link to="/offre">2 paires de lunettes pour 0 €</Link>
          <FiX
            className="absolute right-4 cursor-pointer text-xl"
            onClick={() => setShowBanner(false)}
            aria-label="Fermer le bandeau"
          />
        </motion.div>
      )}

      {/* Navigation avec disparition plus lente */}
      <motion.div
        className="hidden md:flex fixed top-[90.14px] left-0 w-full justify-center items-center px-5 py-2 bg-white z-40"
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -50 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }} // Durée allongée pour une disparition plus fluide
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
          </Link>
          <Link to="/contact" className="text-black hover:text-blue-600">
            Examen de vue gratuit
          </Link>
        </nav>
      </motion.div>

      {/* Hero Section (inchangée) */}
      <section
        className={`transition-all duration-300 ${
          showBanner ? "mt-[150px]" : "mt-[118px]"
        }`}
      >
        <HeroCarousel />
      </section>
    </>
  );
};

export default Header;
