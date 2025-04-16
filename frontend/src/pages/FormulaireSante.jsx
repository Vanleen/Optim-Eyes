// frontend/src/pages/FormulaireSante.jsx
import { useState } from "react";
import axios from "axios";

const FormulaireSante = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    weight: "",
    height: "",
    rhesus: "",
    allergies: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://optim-eyes.onrender.com/api/form", formData);
      setSuccess(true);
      setFormData({
        firstname: "",
        lastname: "",
        age: "",
        weight: "",
        height: "",
        rhesus: "",
        allergies: "",
      });
    } catch (err) {
      console.error("❌ Erreur d'envoi du formulaire :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Formulaire Santé 🩺
        </h1>

        {success && (
          <p className="mb-4 text-green-600 text-center font-medium">
            ✅ Formulaire envoyé avec succès !
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Âge"
              value={formData.age}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="number"
              name="weight"
              placeholder="Poids (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="number"
              name="height"
              placeholder="Taille (cm)"
              value={formData.height}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          <select
            name="rhesus"
            value={formData.rhesus}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
          >
            <option value="">-- Groupe sanguin --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <textarea
            name="allergies"
            placeholder="Allergies (facultatif)"
            value={formData.allergies}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            rows="4"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffaf50] hover:bg-[#e69940] text-white font-semibold py-3 px-6 rounded transition"
          >
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormulaireSante;
