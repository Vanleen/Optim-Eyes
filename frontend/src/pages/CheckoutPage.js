// frontend/src/pages/CheckoutPage.js
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const formatImageUrl = (url) => {
    if (!url) return "/placeholder.png";
    return url.startsWith("http")
      ? url
      : `https://optim-eyes.onrender.com${url}`;
  };

  return (
    <div className="container mx-auto px-6 mt-[120px] py-12">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Passer Commande
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Récapitulatif Panier */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Votre Panier</h2>

          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((product) => (
                <li key={product._id} className="flex items-center border-b pb-4">
                  <img
                    src={formatImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-600 font-semibold">{product.price} €</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Votre panier est vide.</p>
          )}

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Total : {getTotalPrice()} €</p>
          </div>

          <Link
            to="/panier"
            className="block mt-6 text-center text-[#ffaf50] font-semibold text-lg hover:text-[#e69940] transition"
          >
            ← Retour au panier
          </Link>
        </div>

        {/* Formulaire de Paiement */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Informations de Paiement</h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
