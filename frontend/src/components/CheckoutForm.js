// frontend/src/components/CheckoutForm.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { createStripeSession } from "../api/paymentApi";

export default function CheckoutForm({ cart }) {
  const { user } = useAuth();

  const handlePay = async () => {
    if (!user) return alert("Connectez‑vous d’abord !");

    // Si tu as un panier multiple, il faut appeler l'API une fois par item
    // ou modifier le back pour qu'il accepte un tableau. Ici, on fait un exemple pour le premier item :
    const item = cart[0]; 
    try {
      const { url } = await createStripeSession({
        userId:  user._id,
        glassId: item._id,
        quantity: item.quantity || 1,
      });
      window.location.href = url;
    } catch (err) {
      console.error("Erreur paiement Stripe :", err.response?.data || err);
      alert("Impossible de lancer le paiement.");
    }
  };

  const total = cart
    .reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)
    .toFixed(2);

  return (
    <button
      onClick={handlePay}
      className="w-full bg-[#ffaf50] text-white py-3 rounded-md hover:bg-[#e69940]">
      Payer {total} €
    </button>
  );
}
