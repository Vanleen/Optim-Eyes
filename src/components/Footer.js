import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/images/logofooter.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        {/* Liens de navigation */}
        <nav className="mb-4">
          <ul className="flex justify-center gap-6 text-sm">
            <li><Link to="/mentions-legales" className="hover:underline">Mentions Légales</Link></li>
            <li><Link to="/cgv" className="hover:underline">CGV</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </nav>

        {/* Copyright avec animation de cœur */}
        <p className="text-sm flex justify-center items-center gap-1">
          © {new Date().getFullYear()} Optim’Eyes - Fait avec  
          <motion.span 
            className="text-red-500 text-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            ❤️
          </motion.span>
          par Vany
        </p>
      </div>
    </footer>
  );
};

export default Footer;
