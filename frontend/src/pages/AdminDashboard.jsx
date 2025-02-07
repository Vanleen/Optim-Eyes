import React from "react";
import dashboardImage from "../assets/images/dash.png"; // 📸 Import de l'image du dashboard

const AdminDashboard = () => {
  return (
    <section className="py-16 mt-40 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Bienvenue sur le panneau d'administration.
        </p>

        {/* Exemple de contenu */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Utilisateurs</h3>
            <p className="text-gray-600">Gestion des comptes utilisateurs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Commandes</h3>
            <p className="text-gray-600">Suivi des commandes clients.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Produits</h3>
            <p className="text-gray-600">Gestion du catalogue.</p>
          </div>
        </div>
      </div>

      {/* 🔥 Ajout de l'image du dashboard en pleine largeur */}
      <div className="flex justify-center items-center h-screen">
        <img
          src={dashboardImage}
          alt="Dashboard Admin"
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
