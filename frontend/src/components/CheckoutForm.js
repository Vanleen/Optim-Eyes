// frontend/src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { loadStripe }     from '@stripe/stripe-js';
import { createStripeCheckoutSession } from '../api/paymentApi';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  // 📦 Panier depuis localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 📝 Infos de livraison
  const [formData, setFormData] = useState({
    name:    "",
    email:   "",
    address: "",
    country: "France"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calcul du total € 
  const total = cart
    .reduce((sum, p) => sum + p.price * (p.quantity || 1), 0)
    .toFixed(2);
    console.log("🔔 About to call handleCheckout with cart:", cart);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    if (!cart.length) {
      alert("Votre panier est vide !");
      return;
    }
    setLoading(true);

    // Prépare les items pour Stripe
    const items = cart.map(item => ({
      name:     item.name,
      price:    item.price,
      quantity: item.quantity || 1,
    }));

    try {
      // 1) création de la session côté backend
      const { sessionId } = await createStripeCheckoutSession(items);

      // 2) redirection vers Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (err) {
      console.error("Stripe Error:", err);
      setError(err.message || "Erreur lors du paiement");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>

      {/* Nom */}
      <div className="mb-4">
        <label className="block">Nom complet</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Adresse */}
      <div className="mb-4">
        <label className="block">Adresse de livraison</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Pays */}
      <div className="mb-4">
        <label className="block">Pays</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option>France</option>
          <option>Belgique</option>
          <option>Suisse</option>
          <option>Luxembourg</option>
        </select>
      </div>

      {/* Récap panier */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Votre Panier</h2>
      <ul className="mb-4">
        {cart.map(p => (
          <li key={p._id} className="flex justify-between py-2 border-b">
            <span>{p.name} × {p.quantity||1}</span>
            <span>{(p.price * (p.quantity||1)).toFixed(2)} €</span>
          </li>
        ))}
      </ul>
      <div className="text-right font-bold mb-6">
        Total : {total} €
      </div>

      {/* Erreur */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Bouton Stripe Checkout */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ffaf50] text-white py-3 rounded-md hover:bg-[#e69940] transition"
      >
        {loading ? "Chargement…" : `Payer ${total} €`}
      </button>
    </form>
  );
};

export default CheckoutForm;
