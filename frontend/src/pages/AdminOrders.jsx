// frontend/src/pages/AdminOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link }    from "react-router-dom";

const AdminOrders = () => {
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
          `${API_URL}/api/orders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error("❌ Erreur chargement commandes :", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, API_URL]);

  if (loading) return <p className="text-center py-10">Chargement des commandes…</p>;

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Commandes 📦
        </h1>
        {orders.length === 0 ? (
          <p>Aucune commande pour le moment.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-2">N° Commande</th>
                  <th className="p-2">Client</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Statut</th>
                  <th className="p-2">Date</th>
                  <th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-t text-sm">
                    <td className="p-2">{o._id}</td>
                    <td className="p-2">{o.userId.name}</td>
                    <td className="p-2">{o.totalPrice.toFixed(2)} €</td>
                    <td className="p-2">{o.status}</td>
                    <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">
                      <Link
                        to={`/admin/orders/${o._id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Détail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
