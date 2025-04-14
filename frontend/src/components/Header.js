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
import {
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import logo from "../assets/images/logo.svg";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleLogout = () => logout();
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    const updateFavorites = () => {
      const fav = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(fav);
    };

    updateCartCount();
    updateFavorites();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("storage", updateFavorites);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowSearch(scrollTop <= lastScrollTop);
      setIsScrolled(scrollTop > 50);
      setLastScrollTop(scrollTop);
      if (isMenuOpen) setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <img src={logo} alt="Logo" className="h-[55.8px] cursor-pointer" />
            </Link>
            <Link
              to="/"
              className="text-[0.8rem] font-bold md:text-base text-gray-600 hover:text-[#ffaf50]"
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
          {showSearch && !isMenuOpen && (
            <div className="md:hidden fixed top-[89.14px] left-0 w-full px-4 py-2 bg-white shadow-md z-40">
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
                  {user ? (
                    <>
                      <p className="px-4 py-2 text-gray-800">
                        Bienvenue, {user.firstname || user.name} 👋
                      </p>
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        <FiUser className="p-1 border border-black rounded-full" />
                        Mon compte
                      </Link>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-200"
                      >
                        <FiUser className="p-1 border border-red-600 rounded-full" />
                        Admin
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 block"
                      >
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      <FiUser className="p-1 border border-black rounded-full" />
                      Mon compte
                    </Link>
                  )}
                </div>
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

          <button className="md:hidden mr-[-35px]">
            <FiCalendar size={24} className="text-black" />
          </button>
        </div>
      </header>

      <motion.div
        className={`fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <nav className="flex flex-col space-y-4 pl-6 pt-16 text-left">
          <Link
            to="/catalogue/optique"
            className="text-black text-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Optique
          </Link>
          <Link
            to="/catalogue/solaire"
            className="text-black text-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Solaire
          </Link>
          <Link
            to="/catalogue/enfant"
            className="text-black text-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Enfant
          </Link>
          <Link
            to="/recommandations"
            className="text-black text-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Trouver vos lunettes idéales
          </Link>
          <hr className="border-t-2 border-[#ffaf50] w-4/5 my-4 mx-auto" />
          <Link
            to="/login"
            className="flex items-center gap-2 text-black text-lg hover:text-[#ffaf50]"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiUser className="text-xl" /> Mon Compte
          </Link>
          <Link
            to="/panier"
            className="flex items-center gap-2 text-black text-lg hover:text-[#ffaf50]"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiShoppingCart className="text-xl" /> Mon Panier
          </Link>
          <Link
            to="/favoris"
            className="flex items-center gap-2 text-black text-lg hover:text-[#ffaf50]"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiHeart className="text-xl" /> Mes Favoris
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full bg-[#0077B6] py-4 flex justify-center space-x-6">
          <FaInstagram className="text-white text-2xl cursor-pointer" />
          <FaTwitter className="text-white text-2xl cursor-pointer" />
          <FaPinterest className="text-white text-2xl cursor-pointer" />
          <FaTiktok className="text-white text-2xl cursor-pointer" />
        </div>
      </motion.div>
      <div
        className={`hidden md:block fixed top-[95.14px] right-6 z-40 transition-all duration-300 px-6 py-2 text-sm font-semibold rounded-full border ${
          isScrolled
            ? "bg-[#0077B6] text-white border-[#0077B6]"
            : "bg-white text-black border border-black"
        }`}
      >
        <Button>Prendre RDV</Button>
      </div>

      <motion.div
        className="hidden md:flex fixed top-[90.14px] left-0 w-full justify-center items-center px-5 py-2 bg-white z-70"
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -50 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav
          className="flex gap-8 text-[16px] font-normal"
          style={{ fontFamily: "Poppins", fontWeight: "400" }}
        >
          <Link to="/catalogue/optique" className="text-black hover:text-[#ffaf50]">
            Optique
          </Link>
          <Link to="/catalogue/solaire" className="text-black hover:text-[#ffaf50]">
            Solaire
          </Link>
          <Link to="/catalogue/enfant" className="text-black hover:text-[#ffaf50]">
            Enfant
          </Link>
          <Link to="/diagnostic" className="text-black hover:text-[#ffaf50]">
          Diagnostic IA</Link>
          <Link to="/recommandations" className="text-black hover:text-[#ffaf50]">
            Trouver mes lunettes idéales
          </Link>
        </nav>
      </motion.div>

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

      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-[#ffaf50] text-[#ffaf50] shadow-md hover:bg-[#ffaf50] hover:text-white transition-all z-50"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Header;
