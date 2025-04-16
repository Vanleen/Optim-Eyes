import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
          axios.get("https://optim-eyes.onrender.com/api/form/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
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
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
          Tableau de bord admin 📊
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-50 transition"
          >
            <p className="text-5xl font-bold text-[#ffaf50]">{stats.users}</p>
            <p className="mt-2 text-gray-600">Utilisateurs</p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-5xl font-bold text-[#52b788]">{stats.orders}</p>
            <p className="mt-2 text-gray-600">Commandes</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-5xl font-bold text-[#0077B6]">{stats.glasses}</p>
            <p className="mt-2 text-gray-600">Lunettes</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-5xl font-bold text-[#ef476f]">{stats.forms}</p>
            <p className="mt-2 text-gray-600">Formulaires santé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
