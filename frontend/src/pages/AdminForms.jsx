// frontend/src/pages/AdminForms.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminForms = () => {
  const { user } = useAuth();
  const token    = user?.token;
  const API_URL  = process.env.REACT_APP_API_URL;

  const [forms, setForms]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/form/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setForms(data);
      } catch (err) {
        console.error("❌ Échec chargement formulaires :", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, API_URL]);

  if (loading) return <p className="text-center py-10">Chargement des formulaires…</p>;

  return (
    <section className="pt-40 pb-20 min-h-screen bg-gray-100">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Formulaires Santé 🩺</h1>
        {forms.length === 0 ? (
          <p className="text-gray-600">Aucun formulaire reçu pour le moment.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-2">Prénom</th>
                  <th className="p-2">Nom</th>
                  <th className="p-2">Âge</th>
                  <th className="p-2">Poids</th>
                  <th className="p-2">Taille</th>
                  <th className="p-2">Rhésus</th>
                  <th className="p-2">Allergies</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((f) => (
                  <tr key={f._id} className="border-t text-sm">
                    <td className="p-2">{f.firstname}</td>
                    <td className="p-2">{f.lastname}</td>
                    <td className="p-2">{f.age}</td>
                    <td className="p-2">{f.weight} kg</td>
                    <td className="p-2">{f.height} cm</td>
                    <td className="p-2">{f.rhesus}</td>
                    <td className="p-2">{f.allergies || "—"}</td>
                    <td className="p-2">{new Date(f.createdAt).toLocaleDateString()}</td>
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

export default AdminForms;
