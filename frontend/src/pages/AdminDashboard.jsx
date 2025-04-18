// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link }               from "react-router-dom";
import axios                   from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    glasses: 0,
    users:   0,
    orders:  0,
    forms:   0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // On récupère simultanément tous les counts
        const [glassesRes, usersRes, ordersRes, formsRes] = await Promise.all([
          axios.get("https://optim-eyes.onrender.com/api/glasses"),
          axios.get("https://optim-eyes.onrender.com/api/users", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("https://optim-eyes.onrender.com/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("https://optim-eyes.onrender.com/api/form/all", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setStats({
          glasses: glassesRes.data.length,
          users:   usersRes.data.length,
          orders:  ordersRes.data.length,
          forms:   formsRes.data.length,
        });
      } catch (error) {
        console.error("❌ Erreur dashboard admin :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
          Tableau de bord admin 📊
        </h1>

        {/* Bouton externe vers le rapport Power BI */}
        <div className="text-center mb-8">
          <a
            href="https://github.com/PtlAkash/dashboard-optim-eyes/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ffaf50] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#e69940] transition"
          >
            Accéder au rapport
          </a>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition"
          >
            <p className="text-5xl font-bold text-[#ffaf50]">{stats.users}</p>
            <p className="mt-2 text-gray-600">Utilisateurs</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition"
          >
            <p className="text-5xl font-bold text-[#52b788]">{stats.orders}</p>
            <p className="mt-2 text-gray-600">Commandes</p>
          </Link>

          <Link
            to="/admin/glasses"
            className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition"
          >
            <p className="text-5xl font-bold text-[#0077B6]">{stats.glasses}</p>
            <p className="mt-2 text-gray-600">Lunettes</p>
          </Link>

          <Link
            to="/admin/forms"
            className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition"
          >
            <p className="text-5xl font-bold text-[#ef476f]">{stats.forms}</p>
            <p className="mt-2 text-gray-600">Formulaires santé</p>
          </Link>
        </div>

        {/* Intégration du rapport Power BI */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            📊 Statistiques Power BI
          </h2>
          <div className="w-full h-[600px] border rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Power BI Dashboard"
              width="100%"
              height="100%"
              src="https://app.powerbi.com/groups/me/reports/f02dcdc3-1f97-4270-9d2e-9b4fb69ca829?ctid=901cb4ca-b862-4029-9306-e5cd0f6d9f86&pbi_source=linkShare"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
