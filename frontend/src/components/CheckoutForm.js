// frontend/src/components/CheckoutForm.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createStripeCheckoutSession } from '../api/paymentApi';

// 1️⃣ Log de ta clé publishable pour être sûr·e qu’elle est correcte
console.log("▶ Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ cart }) => {
  const handleCheckout = async () => {
    // Préparation des items
    const items = cart.map(item => ({
      name:     item.name,
      price:    item.price,
      quantity: item.quantity || 1,
    }));

    // 2️⃣ Log des items qu’on envoie au backend
    console.log("▶ Items envoyés :", items);

    try {
      // Appel à l’API pour créer la session
      const { sessionId } = await createStripeCheckoutSession(items);

      // 3️⃣ Log du sessionId reçu
      console.log("▶ sessionId reçu :", sessionId);

      // Initialisation de Stripe et redirection
      const stripe = await stripePromise;
      console.log("▶ Appel redirectToCheckout…");
      const { error } = await stripe.redirectToCheckout({ sessionId });

      // 4️⃣ Log d’un éventuel message d’erreur de redirection
      console.log("▶ redirectToCheckout error :", error);
    } catch (err) {
      console.error("Erreur dans handleCheckout :", err);
    }
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-[#ffaf50] text-white font-semibold py-3 rounded-md hover:bg-[#e69940] transition"
    >
      Payer {total} €
    </button>
  );
};

export default CheckoutForm;
