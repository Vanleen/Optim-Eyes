import React, { useEffect, useState } from 'react';
import axios                              from 'axios';
import { useAuth }                        from '../context/AuthContext';
import { Link }                           from 'react-router-dom';

export default function MonComptePage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/myorders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error('Erreur récup mon compte :', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, token]);

  if (loading) return <p>Chargement de vos commandes…</p>;

  return (
    <section className="pt-24 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Mon compte — Mes commandes</h1>
        {orders.length === 0 ? (
          <p>Vous n’avez passé aucune commande pour l’instant.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order._id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Commande n° {order._id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.totalPrice.toFixed(2)} €</p>
                    <p className="text-sm">
                      {order.isPaid ? 'Payée' : order.status}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/order/${order._id}`}
                  className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                >
                  Voir le détail
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
