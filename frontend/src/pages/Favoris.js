import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((product) => product._id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Mes Favoris ❤️
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.length > 0 ? (
            favorites.map((product) => {
              const imageSrc = product.imageUrl?.startsWith("http")
                ? product.imageUrl
                : `http://localhost:5000${product.imageUrl}`;
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <Link to={`/produit/${product._id}`} className="block">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </Link>

                  <button
                    className="absolute bottom-3 right-3 text-xl text-red-500"
                    onClick={() => removeFavorite(product._id)}
                  >
                    <FiHeart className="fill-current text-red-500" />
                  </button>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} €</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              Aucun favori pour le moment.
            </p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/catalogue/optique"
            className="inline-block px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition"
          >
            Découvrir plus de montures
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Favoris;
