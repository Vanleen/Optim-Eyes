// frontend/src/pages/Recommandations.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const Recommandations = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get("https://optim-eyes.onrender.com/api/glasses/recommendations");
        setRecommended(data);
      } catch (err) {
        console.error("❌ Erreur recommandations :", err);
      }
    };
    fetchRecommendations();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((p) => p._id === product._id);
    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "/placeholder.png";
    return url.startsWith("http") ? url : `https://optim-eyes.onrender.com${url}`;
  };

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Vos recommandations personnalisées 🧠
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <img
                src={formatImageUrl(product.imageUrl)}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.price} €</p>

                <div className="flex justify-between">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-[#0077B6] font-medium hover:underline"
                  >
                    Voir la fiche
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-[#ffaf50] hover:text-[#e69940] text-xl"
                    title="Ajouter au panier"
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommended.length === 0 && (
          <p className="text-gray-500 mt-10">Aucune recommandation disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
};

export default Recommandations;
