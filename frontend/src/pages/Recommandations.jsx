// frontend/src/pages/Recommandations.jsx
import React, { useEffect, useState } from 'react';
import axios                            from 'axios';
import { Link }                         from 'react-router-dom';
import { FiShoppingCart }               from 'react-icons/fi';
import { useAuth }                      from '../context/AuthContext';

export default function Recommandations() {
  const { user } = useAuth();
  const token    = user?.token;
  const API_URL  = process.env.REACT_APP_API_URL;

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/recommendations/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecommended(data);
      } catch (err) {
        console.error('❌ Erreur recommandations :', err.response?.data || err);
      }
    })();
  }, [token, user, API_URL]);

  const addToCart = product => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.find(p => p._id === product._id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const fmtImg = url =>
    url.startsWith('http') ? url : `${API_URL}${url}`;

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Vos recommandations idéales 🧠
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map(prod => (
            <div
              key={prod._id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <img
                src={fmtImg(prod.imageUrl)}
                alt={prod.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prod.name}</h3>
                <p className="text-gray-600 mb-2">{prod.price.toFixed(2)} €</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/product/${prod._id}`}
                    className="text-[#0077B6] hover:underline"
                  >
                    Voir la fiche
                  </Link>
                  <button
                    onClick={() => addToCart(prod)}
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
          <p className="text-gray-500 mt-10">
            Aucune recommandation disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}
