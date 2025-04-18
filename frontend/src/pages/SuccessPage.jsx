// frontend/src/pages/SuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link }      from 'react-router-dom';
import axios                          from 'axios';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId       = searchParams.get('session_id');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading]     = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        // 1) Récupère la session Stripe pour extraire metadata.orderId
        const { data: session } = await axios.get(
          `${API_URL}/api/payments/stripe/session/${sessionId}`
        );
        const orderId = session.metadata.orderId;

        // 2) Récupère la commande en base
        const { data: order } = await axios.get(
          `${API_URL}/api/orders/${orderId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        setOrderData({ session, order });
      } catch (err) {
        console.error('Erreur sur SuccessPage:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId, API_URL]);

  if (loading) return <p>Chargement…</p>;
  if (!orderData) return <p>Impossible de récupérer les infos.</p>;

  const { session, order } = orderData;

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl font-semibold text-green-600">Merci pour votre commande !</h1>
      <p className="mt-4">Votre paiement a été enregistré (ID : {session.payment_intent}).</p>

      <h2 className="mt-6 text-2xl font-semibold">Récapitulatif</h2>
      <ul className="mt-4 text-left inline-block">
        {order.items.map((it) => (
          <li key={it.glassId} className="py-1">
            {it.name} × {it.quantity} &mdash; {(it.price * it.quantity).toFixed(2)} €
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold">Total : {order.totalPrice.toFixed(2)} €</p>

      <Link
        to="/"
        className="mt-8 inline-block bg-[#ffaf50] text-white py-2 px-4 rounded hover:bg-[#e69940]"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default SuccessPage;
