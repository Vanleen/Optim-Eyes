import { useState } from "react";

const CheckoutForm = ({ cart, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "France",
    paymentMethod: "stripe",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📢 Formulaire soumis :", formData);
    alert("Paiement en cours...");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informations de paiement</h2>

      {/* 🔹 Nom */}
      <div className="mb-4">
        <label className="block text-gray-700">Nom complet</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* 🔹 Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* 🔹 Adresse */}
      <div className="mb-4">
        <label className="block text-gray-700">Adresse de livraison</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* 🔹 Pays */}
      <div className="mb-4">
        <label className="block text-gray-700">Pays</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="France">France</option>
          <option value="Belgique">Belgique</option>
          <option value="Suisse">Suisse</option>
          <option value="Luxembourg">Luxembourg</option>
        </select>
      </div>

      {/* 🔹 Méthode de paiement */}
      <div className="mb-4">
        <label className="block text-gray-700">Méthode de paiement</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="stripe">💳 Carte Bancaire (Stripe)</option>
          <option value="paypal">🅿️ PayPal</option>
        </select>
      </div>

      {/* 🔹 Bouton de paiement */}
      <button
        type="submit"
        className="w-full bg-[#ffaf50] text-white font-semibold py-3 rounded-lg hover:bg-[#e69940]"
      >
        Payer {totalPrice} €
      </button>
    </form>
  );
};

export default CheckoutForm;
