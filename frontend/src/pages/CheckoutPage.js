// frontend/src/pages/CheckoutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

// Helper pour formater l'URL de l'image produit
const formatImageUrl = (url) => {
  if (!url) return '/placeholder.png';
  return url.startsWith('http') ? url : `https://optim-eyes.onrender.com${url}`;
};

const CheckoutPage = () => {
  // Récupère le panier depuis localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Si le panier est vide, on propose de retourner à l'accueil
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 mt-[120px] py-12 text-center">
        <p className="text-gray-600">Votre panier est vide.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#ffaf50] text-white px-6 py-3 rounded-md hover:bg-[#e69940] transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Calcul du total
  const total = cart
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-6 mt-[120px] py-12">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Passer Commande
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Récapitulatif du Panier */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Votre Panier</h2>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li
                key={product._id}
                className="flex items-center border-b pb-4"
              >
                <img
                  src={formatImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-600 font-semibold">
                    {product.price} € × {product.quantity || 1}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right font-semibold text-lg">
            Total : {total} €
          </div>
          <Link
            to="/panier"
            className="block mt-6 text-center text-[#ffaf50] font-semibold hover:text-[#e69940] transition"
          >
            ← Retour au panier
          </Link>
        </div>

        {/* Zone de Paiement */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Paiement sécurisé (Stripe Checkout)
          </h2>
          <CheckoutForm cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
