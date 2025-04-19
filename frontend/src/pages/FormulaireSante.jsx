// frontend/src/pages/FormulaireSante.jsx
import { useState } from "react";
import axios from "axios";

const FormulaireSante = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    visionIssues: "",
    glassesOrContacts: "",
    ocularHistory: "",
    examFrequency: "",
    screenSensitivity: "",
    familyHistory: "",
    allergies: "",
    prescriptionFile: null,
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "prescriptionFile") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      await axios.post("https://optim-eyes.onrender.com/api/form", formData);
      setSuccess(true);
      setFormData({
        firstname: "",
        lastname: "",
        age: "",
        visionIssues: "",
        glassesOrContacts: "",
        ocularHistory: "",
        examFrequency: "",
        screenSensitivity: "",
        familyHistory: "",
        allergies: "",
        prescriptionFile: null,
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
          Formulaire Santé Visuelle 👁️
        </h1>

        {success && (
          <p className="mb-4 text-green-600 text-center font-medium">
            ✅ Formulaire envoyé avec succès !
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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

          <input
            type="number"
            name="age"
            placeholder="Âge"
            value={formData.age}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
          />

          <textarea
            name="visionIssues"
            placeholder="Problèmes de vision (myopie, astigmatisme, etc.)"
            value={formData.visionIssues}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="3"
          ></textarea>

          <select
            name="glassesOrContacts"
            value={formData.glassesOrContacts}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
          >
            <option value="">-- Portez-vous des lunettes ou lentilles ? --</option>
            <option value="lunettes">Oui, lunettes</option>
            <option value="lentilles">Oui, lentilles</option>
            <option value="aucun">Non</option>
          </select>

          <textarea
            name="ocularHistory"
            placeholder="Antécédents médicaux oculaires"
            value={formData.ocularHistory}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="3"
          ></textarea>

          <select
            name="examFrequency"
            value={formData.examFrequency}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
          >
            <option value="">-- Dernier examen de vue --</option>
            <option value="<1an">Moins d’un an</option>
            <option value="1-2ans">Entre 1 et 2 ans</option>
            <option value=">2ans">Plus de 2 ans</option>
          </select>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700">Sensibilité aux écrans/lumière ?</label>
            <label><input type="radio" name="screenSensitivity" value="oui" onChange={handleChange} required /> Oui</label>
            <label><input type="radio" name="screenSensitivity" value="non" onChange={handleChange} /> Non</label>
          </div>

          <textarea
            name="familyHistory"
            placeholder="Antécédents familiaux (glaucome, DMLA, etc.)"
            value={formData.familyHistory}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="3"
          ></textarea>

          <textarea
            name="allergies"
            placeholder="Allergies (facultatif)"
            value={formData.allergies}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <div>
            <label className="block text-gray-700 mb-1">Ordonnance / Fichier médical (PDF ou image)</label>
            <input
              type="file"
              name="prescriptionFile"
              accept="application/pdf,image/*"
              onChange={handleChange}
              className="border rounded px-4 py-2 w-full bg-white"
            />
          </div>

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
