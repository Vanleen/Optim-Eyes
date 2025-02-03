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
import { FaInstagram, FaTwitter, FaPinterest, FaTiktok } from "react-icons/fa";
import logo from "../assets/images/logo.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowSearch(scrollTop <= lastScrollTop);
      setIsScrolled(scrollTop > 50);
      setLastScrollTop(scrollTop);

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isMenuOpen]);

  return (
    <>
      {/* Header Principal */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md h-[90px]" : "bg-white h-[90.14px]"
        }`}
        style={{ padding: "10px 50px" }}
      >
        <div className="flex items-center justify-between">
          {/* Menu Burger */}
          <button
            className="md:hidden ml-[-35px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo et Slogan */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-[55.8px]" />
            <span
              className="text-[0.8rem] font-bold md:text-base md:font-normal text-gray-600"
              style={{ fontFamily: "Telegraf" }}
            >
              TOUT DEVIENT PLUS CLAIR
            </span>
          </div>

          {/* Barre de recherche Desktop */}
          <div className="flex-grow mx-6 hidden md:block">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm border-opacity-50"
            />
          </div>

          {/* Barre de recherche Mobile */}
          {showSearch && (
            <div className="md:hidden fixed top-[89.14px] left-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-300 z-40">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          )}

          {/* Icônes utilisateur + Menu déroulant */}
          <div className="flex items-center relative">
            <div className="hidden md:flex gap-4 text-xl text-black items-center">
              {/* Icône utilisateur avec menu déroulant au survol */}
              <div className="relative group">
                <FiUser className="cursor-pointer hover:text-blue-600" />

                {/* Menu déroulant (visible au survol) */}
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-1000">
                  <Link
                    to="/mon-compte"
                    className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FiUser className="p-1 border border-black rounded-full" />
                    Mon compte
                  </Link>
                  <Link
                    to="/favoris"
                    className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FiHeart className="p-1 border border-black rounded-full" />
                    Mes favoris
                  </Link>
                </div>
              </div>

              <FiHeart className="cursor-pointer hover:text-blue-600" />
              <FiShoppingCart className="cursor-pointer hover:text-blue-600" />
            </div>

            {/* Icône Calendrier (Mobile) */}
            <button className="md:hidden mr-[-35px]">
              <FiCalendar size={24} className="text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Burger */}
      <motion.div
        className={`fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        

        <nav className="flex flex-col space-y-4 pl-6 pt-16 text-left">
          <Link to="/" className="text-black text-lg hover:text-blue-600">
            Optique
          </Link>
          <Link to="/services" className="text-black text-lg hover:text-blue-600">
            Solaire
          </Link>
          <Link to="/contact" className="text-black text-lg hover:text-blue-600">
            Nos verres
          </Link>
          <Link to="/contact" className="text-black text-lg hover:text-blue-600">
            Examen de vue gratuit
          </Link>
        </nav>

        {/* Icônes réseaux sociaux */}
        <div className="absolute bottom-0 w-full bg-[#0077B6] py-4 flex justify-center space-x-6">
          <FaInstagram className="text-white text-2xl cursor-pointer" />
          <FaTwitter className="text-white text-2xl cursor-pointer" />
          <FaPinterest className="text-white text-2xl cursor-pointer" />
          <FaTiktok className="text-white text-2xl cursor-pointer" />
        </div>
      </motion.div>

      {/* Bouton Prendre RDV */}
      <div
        className={`hidden md:block fixed top-[95.14px] right-6 z-40 transition-all duration-300 px-6 py-2 text-sm font-semibold rounded-full border ${
          isScrolled
            ? "bg-[#0077B6] text-white border-[#0077B6]"
            : "bg-white text-black border border-black"
        }`}
      >
        <Button>Prendre RDV</Button>
      </div>

      {/* Navigation avec disparition plus lente */}
      <motion.div
        className="hidden md:flex fixed top-[90.14px] left-0 w-full justify-center items-center px-5 py-2 bg-white z-70"
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

      {/* Bandeau promo */}
      {showBanner && (
        <motion.div
          className="fixed top-[145px] left-0 w-full flex justify-center items-center py-2 px-4 text-[0.85rem] bg-gray-100 text-black relative text-center z-40"
          animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -50 : 0 }}
        >
          <Link to="/offre">2 paires de lunettes pour 0 €</Link>
          <FiX className="absolute right-4 cursor-pointer text-xl" onClick={() => setShowBanner(false)} />
        </motion.div>
      )}
    </>
  );
};

export default Header;
