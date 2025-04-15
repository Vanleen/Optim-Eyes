// frontend/src/pages/DiagnosticPage.jsx
import { useState, useRef } from "react";
import axios from "axios";

const DiagnosticPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult(null);
    setSelecting(false);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    fileInputRef.current.value = null;
  };

  const handleFileSelect = () => {
    setSelecting(true);
    fileInputRef.current?.click();
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
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Diagnostic Visuel IA 👁️
        </h1>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-center space-y-4">
          <button
            type="button"
            onClick={handleFileSelect}
            className={`px-6 py-2 rounded text-white font-semibold bg-[#0077B6] hover:bg-[#005f91] transition duration-200 ${
              selecting ? "opacity-70" : ""
            }`}
          >
            {selecting ? "Chargement..." : "📤 Ajouter une image"}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />

          {image && (
            <p className="text-sm text-gray-600">📎 {image.name}</p>
          )}

          {imagePreview && (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-auto rounded shadow"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white text-red-600 rounded-full px-2 py-0.5 font-bold shadow hover:bg-red-100"
                aria-label="Supprimer l'image"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={!image || loading}
            className="bg-[#ffaf50] px-6 py-2 rounded text-white font-semibold hover:bg-[#e69940] disabled:bg-gray-400"
          >
            {loading ? "Analyse en cours..." : "Analyser l’image"}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-white p-4 rounded shadow max-w-xl mx-auto">
            <h3 className="font-bold text-lg mb-2">Résultat :</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiagnosticPage;
