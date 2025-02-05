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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [cartCount, setCartCount] = useState(0);  // ✅ Déplacement ici
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );


  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300); // ✅ Bouton visible après 300px de scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateFavorites = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };

    window.addEventListener("storage", updateFavorites);
    return () => window.removeEventListener("storage", updateFavorites);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

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

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md h-[90px]" : "bg-white h-[90.14px]"
        }`}
        style={{ padding: "10px 50px" }}
      >
        <div className="flex items-center justify-between">
          <button
            className="md:hidden ml-[-35px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-[55.8px] cursor-pointer"
              />
            </Link>
            <Link
              to="/"
              className="text-[0.8rem] font-bold md:text-base md:font-normal text-gray-600 hover:text-[#ffaf50]"
              style={{ fontFamily: "Telegraf" }}
            >
              TOUT DEVIENT PLUS CLAIR
            </Link>
          </div>

          <div className="flex-grow mx-6 hidden md:block">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm border-opacity-50"
            />
          </div>

          {showSearch && (
            <div className="md:hidden fixed top-[89.14px] left-0 w-full px-4 py-2 bg-white shadow-md transition-all duration-300 z-40">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
          )}

          <div className="flex items-center relative">
            <div className="hidden md:flex gap-4 text-xl text-black items-center">
              <div className="relative group">
                <FiUser className="cursor-pointer hover:text-blue-600" />
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-1000">
                  <Link
                    to="/login"
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

              <Link to="/favoris">
                <FiHeart
                  className={`cursor-pointer text-xl ${
                    favorites.length > 0
                      ? "fill-current text-red-500"
                      : "text-black"
                  }`}
                />
              </Link>

              <Link to="/panier" className="relative">
      <FiShoppingCart className="cursor-pointer hover:text-blue-600 text-2xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
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
          <Link
            to="/catalogue/optique"
            className="text-black text-lg hover:text-blue-600"
          >
            Optique
          </Link>
          <Link
            to="/catalogue/solaire"
            className="text-black text-lg hover:text-blue-600"
          >
            Solaire
          </Link>
          <Link
            to="/catalogue/enfant"
            className="text-black text-lg hover:text-blue-600"
          >
            Enfant
          </Link>
          <Link
            to="/contact"
            className="text-black text-lg hover:text-blue-600"
          >
            Examen à domicile
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
          <Link
            to="/catalogue/optique"
            className="text-black hover:text-[#ffaf50]"
          >
            Optique
          </Link>
          <Link
            to="/catalogue/solaire"
            className="text-black hover:text-[#ffaf50]"
          >
            Solaire
          </Link>
          <Link
            to="/catalogue/enfant"
            className="text-black hover:text-[#ffaf50]"
          >
            Enfant
          </Link>
          <Link to="#" className="text-black hover:text-[#ffaf50]">
            Examen à domicile
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
          <FiX
            className="absolute right-4 cursor-pointer text-xl"
            onClick={() => setShowBanner(false)}
          />
        </motion.div>
      )}
      {/* ✅ Bouton de remontée en haut - Maintenant en dehors de la condition showBanner */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-[#ffaf50] text-[#ffaf50] shadow-md hover:bg-[#ffaf50] hover:text-white transition-all z-50"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Header;
