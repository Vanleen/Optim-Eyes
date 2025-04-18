import React, { useEffect, useState } from 'react';
import axios                           from 'axios';
import { useAuth }                     from '../context/AuthContext';
import { Link }                        from 'react-router-dom';

export default function MonComptePage() {
  const { user } = useAuth();
  const token    = user?.token;
  const API_URL  = process.env.REACT_APP_API_URL;
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/orders/myorders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error('Erreur Mon compte :', err.response?.data || err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return (
      <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md text-center">
          <p>Chargement de vos commandes…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Mon compte — Mes commandes
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">
            Vous n’avez passé aucune commande pour l’instant.
          </p>
        ) : (
          <ul className="space-y-6">
            {orders.map(order => (
              <li key={order._id} className="flex items-center border-b pb-4">
                <div className="flex-1">
                  <p className="font-medium">Commande n° {order._id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.totalPrice.toFixed(2)} €</p>
                  <p className="text-sm text-gray-500">
                    {order.isPaid ? 'Payée' : order.status}
                  </p>
                  <Link
                    to={`/order/${order._id}`}
                    className="mt-1 inline-block text-[#ffaf50] hover:text-[#e69940] text-sm"
                  >
                    Voir le détail
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
