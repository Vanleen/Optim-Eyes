// frontend/src/pages/Recommandations.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate }   from "react-router-dom";
import { FiShoppingCart }      from "react-icons/fi";
import axios                   from "axios";
import { useAuth }             from "../context/AuthContext";

const Recommandations = () => {
  const { user }   = useAuth();
  const token      = user?.token;
  const navigate   = useNavigate();
  const API_URL    = process.env.REACT_APP_API_URL;

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchRecs = async () => {
      try {
        // 1) préférences depuis l'API
        const { data: prefs } = await axios.get(
          `${API_URL}/api/recommendations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // stocker en local pour la page IA
        localStorage.setItem('prefRecs', JSON.stringify(prefs));

        // 2) recos IA stockées précédemment
        const ia = JSON.parse(localStorage.getItem('aiRecs') || "[]");

        // 3) fusion sans doublon
        const merged = [
          ...prefs,
          ...ia.filter(a => !prefs.some(p => p._id === a._id))
        ];

        setRecommended(merged);
      } catch (err) {
        console.error("❌ Erreur recommandations :", err.response?.data || err);
      }
    };
    fetchRecs();
  }, [token, navigate, API_URL]);

  const addToCart = product => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find(p => p._id === product._id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const formatImageUrl = url =>
    url && url.startsWith("http") ? url : `${API_URL}${url}`;

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Vos recommandations personnalisées 🧠
        </h1>

        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map(product => (
              <div key={product._id}
                   className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={formatImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {product.price.toFixed(2)} €
                  </p>
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
        ) : (
          <p className="text-gray-500 mt-10">
            Aucune recommandation disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Recommandations;
