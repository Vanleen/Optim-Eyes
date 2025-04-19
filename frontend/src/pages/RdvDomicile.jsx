// frontend/src/pages/RdvDomicile.jsx
import { Link } from "react-router-dom";

const RdvDomicile = () => {
  return (
    <section className="pt-40 pb-20 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-[#0077B6] mb-4">
          Consultation à domicile 🚐
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Ce service est en cours de mise en place dans votre région.<br />
          Restez connecté pour être informé de son lancement officiel 👓
        </p>
        <Link
          to="/"
          className="inline-block bg-[#ffaf50] text-white font-semibold px-6 py-3 rounded hover:bg-[#e6953a] transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    </section>
  );
};

export default RdvDomicile;
