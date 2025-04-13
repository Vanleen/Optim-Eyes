import { Link } from "react-router-dom";

const FeatureComingSoon = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Fonctionnalité à venir
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Une nouvelle section Admin sera bientôt disponible pour la gestion du site.
        </p>
        <Link
          to="/admin"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Admin
        </Link>
      </div>
    </section>
  );
};

export default FeatureComingSoon;
