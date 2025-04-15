// frontend/src/pages/DiagnosticPage.jsx
import { useState, useRef } from "react";
import axios from "axios";

const DiagnosticPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
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
      <div className="container mx-auto mt-[160px] max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Diagnostic Visuel IA 👁️
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-1/2">
              {imagePreview ? (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="rounded shadow object-cover max-h-64 w-full"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white text-red-600 rounded-full px-2 py-0.5 font-bold shadow hover:bg-red-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-gray-500 hover:border-[#0077B6] hover:text-[#0077B6] transition"
                >
                  📤 Cliquez ou glissez une image
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
              />
            </div>

            <div className="w-full md:w-1/2 text-center">
              <button
                type="submit"
                disabled={!image || loading}
                className="w-full px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition disabled:bg-gray-400"
              >
                {loading ? "Analyse en cours..." : "Analyser l’image"}
              </button>
            </div>
          </div>
        </form>

        {result && (
          <div className="mt-8 bg-gray-50 p-4 rounded shadow text-left">
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
