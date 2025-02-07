import React from "react";
import consultationImage from "../assets/images/consultation.jpg"; // Remplace avec ton image

const ConsultationDomicile = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Image à gauche */}
        <div className="w-full h-[500px]"> {/* Hauteur ajustée */}
          <img
            src={consultationImage}
            alt="Consultation à domicile"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Texte à droite */}
        <div className="text-center md:text-left px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Consultation à domicile
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Profitez d'une consultation optique à domicile avec un praticien 
            spécialisé. Un service sur mesure pour vous garantir un confort optimal 
            sans vous déplacer.
          </p>
          
          {/* Bouton "En savoir plus" */}
          <a
            href="/consultation"
            className="inline-block px-6 py-3 bg-[#0077B6] text-white text-lg font-semibold rounded-md 
                       hover:bg-[#005f87] transition-all duration-300"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConsultationDomicile;
