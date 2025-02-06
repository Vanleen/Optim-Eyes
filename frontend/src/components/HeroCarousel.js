import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import des images du carrousel
import img1 from "../assets/images/hero1.jpg";
import img2 from "../assets/images/hero2.jpg";
import img3 from "../assets/images/hero3.jpg";

const images = [img1, img2, img3];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[565px] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Bouton précédent */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={prevSlide}
        aria-label="Image précédente"
      >
        <FiChevronLeft size={30} />
      </button>

      {/* Bouton suivant */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={nextSlide}
        aria-label="Image suivante"
      >
        <FiChevronRight size={30} />
      </button>
    </div>
  );
};

export default HeroCarousel;
