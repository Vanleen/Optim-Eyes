// frontend/src/pages/AdminGlasses.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminGlasses = () => {
  const { user } = useAuth();
  const token    = user?.token;
  const API_URL  = process.env.REACT_APP_API_URL;

  const [glasses, setGlasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/glasses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGlasses(data);
      } catch (err) {
        console.error("❌ Erreur chargement lunettes :", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, API_URL]);

  if (loading) return <p className="text-center py-10">Chargement du catalogue…</p>;

  return (
    <section className="pt-40 pb-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lunettes 🕶️</h1>
        {glasses.length === 0 ? (
          <p className="text-gray-600">Aucune lunette trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {glasses.map((g) => (
              <div key={g._id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={g.imageUrl.startsWith('http') ? g.imageUrl : `${API_URL}${g.imageUrl}`}
                  alt={g.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold">{g.name}</h2>
                  <p className="text-gray-600">{g.brand}</p>
                  <p className="font-bold mt-2">{g.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminGlasses;
