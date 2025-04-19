import { useState, useRef } from "react";
import axios from "axios";

const FormulaireSante = () => {
  const fileInputRef = useRef();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== "prescriptionFile") data.append(key, value);
      });

      if (formData.prescriptionFile) {
        data.append("prescriptionFile", formData.prescriptionFile);
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/form`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

      if (fileInputRef.current) fileInputRef.current.value = "";
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
              type="text"
              name="visionIssues"
              placeholder="Problèmes de vision"
              value={formData.visionIssues}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              name="glassesOrContacts"
              placeholder="Lunettes ou lentilles"
              value={formData.glassesOrContacts}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          <textarea
            name="ocularHistory"
            placeholder="Antécédents oculaires"
            value={formData.ocularHistory}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <textarea
            name="examFrequency"
            placeholder="Fréquence des examens"
            value={formData.examFrequency}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <textarea
            name="screenSensitivity"
            placeholder="Sensibilité aux écrans"
            value={formData.screenSensitivity}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <textarea
            name="familyHistory"
            placeholder="Antécédents familiaux"
            value={formData.familyHistory}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <textarea
            name="allergies"
            placeholder="Allergies (facultatif)"
            value={formData.allergies}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            rows="2"
          ></textarea>

          <input
            type="file"
            name="prescriptionFile"
            ref={fileInputRef}
            onChange={(e) =>
              setFormData({ ...formData, prescriptionFile: e.target.files[0] })
            }
            className="border rounded px-4 py-2 w-full"
            accept="image/*,application/pdf"
          />

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