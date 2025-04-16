// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    glasses: 0,
    users: 0,
    orders: 0,
    forms: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [glasses, users, orders, forms] = await Promise.all([
          axios.get("https://optim-eyes.onrender.com/api/glasses"),
          axios.get("https://optim-eyes.onrender.com/api/users"),
          axios.get("https://optim-eyes.onrender.com/api/orders"),
          axios.get("https://optim-eyes.onrender.com/api/form/all"),
        ]);

        setStats({
          glasses: glasses.data.length,
          users: users.data.length,
          orders: orders.data.length,
          forms: forms.data.length,
        });
      } catch (error) {
        console.error("❌ Erreur dashboard admin :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="pt-40 pb-20 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Bienvenue sur le panneau d'administration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link to="/admin/glasses" className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition">
            <p className="text-5xl font-bold text-[#0077B6]">{stats.glasses}</p>
            <p className="mt-2 text-gray-600">Lunettes</p>
          </Link>

          <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition">
            <p className="text-5xl font-bold text-[#ffaf50]">{stats.users}</p>
            <p className="mt-2 text-gray-600">Utilisateurs</p>
          </Link>

          <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition">
            <p className="text-5xl font-bold text-[#52b788]">{stats.orders}</p>
            <p className="mt-2 text-gray-600">Commandes</p>
          </Link>

          <Link to="/admin/forms" className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition">
            <p className="text-5xl font-bold text-[#ef476f]">{stats.forms}</p>
            <p className="mt-2 text-gray-600">Formulaires santé</p>
          </Link>
        </div>

        {/* Power BI iframe placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Visualisation Power BI
          </h2>
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded">
            <span className="text-gray-400 italic">
              🔌 Intégration Power BI à venir...
            </span>
            {/* Remplacer par <iframe src="..." /> dès que le lien sera fourni */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
