// frontend/src/pages/DiagnosticPage.jsx
import { useState } from "react";
import axios from "axios";

const DiagnosticPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://optim-eyes.onrender.com/api/ai/diagnosis",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (err) {
      console.error("❌ Erreur diagnostic :", err);
      setResult({ message: "Erreur lors du diagnostic." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-32 px-4 max-w-xl text-center">
      <h2 className="text-3xl font-bold mb-6">Diagnostic Visuel IA 👁️</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0
            file:text-sm file:font-semibold file:bg-[#0077B6] file:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#ffaf50] px-6 py-2 rounded text-white font-semibold hover:bg-[#e69940]"
        >
          {loading ? "Analyse en cours..." : "Analyser l’image"}
        </button>
      </form>

      {result && (
        <div className="mt-6 text-left bg-gray-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Résultat :</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DiagnosticPage;
