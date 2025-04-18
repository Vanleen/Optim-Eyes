// frontend/src/pages/SuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link }           from 'react-router-dom';
import axios                                from 'axios';

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

        // 3) Vider le panier une fois la commande récupérée
        localStorage.removeItem('cart');
      } catch (err) {
        console.error('Erreur sur SuccessPage:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId, API_URL]);

  if (loading) {
    return (
      <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md text-center">
          <p>Chargement…</p>
        </div>
      </section>
    );
  }

  if (!orderData) {
    return (
      <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md text-center">
          <p>Impossible de récupérer les informations de la commande.</p>
        </div>
      </section>
    );
  }

  const { session, order } = orderData;

  // Helper pour formater l'URL de l'image (à adapter selon ton backend)
  const formatImageUrl = (url) =>
    url?.startsWith('http') ? url : `${process.env.REACT_APP_API_URL}${url}`;

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-green-600 mb-4 text-center">
          ✅ Paiement confirmé !
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Votre commande n° <strong>{order._id}</strong> a bien été enregistrée.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Récapitulatif</h2>
        <ul className="space-y-4">
          {order.items.map((it) => {
            // On suppose que backend a peuplé items.glassId avec { name, price, imageUrl }
            const glass = it.glassId;
            const qty   = it.quantity;
            const sub   = (glass.price * qty).toFixed(2);
            return (
              <li key={glass._id} className="flex items-center border-b pb-4">
                <img
                  src={formatImageUrl(glass.imageUrl)}
                  alt={glass.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                />
                <div className="flex-1">
                  <p className="font-medium">{glass.name}</p>
                  <p className="text-gray-600">
                    × {qty} — {sub} €
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-right text-xl font-bold">
          Total : {order.totalPrice.toFixed(2)} €
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-[#ffaf50] hover:bg-[#e69940] text-white font-semibold py-2 px-6 rounded transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
