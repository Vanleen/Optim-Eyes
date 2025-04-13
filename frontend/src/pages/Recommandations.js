import { useState } from "react";

const Recommandations = () => {
  const [formData, setFormData] = useState({
    gender: "Homme",
    age: "",
    category: "Repos",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRecommendations([]);

    try {
      const res = await fetch("http://localhost:5000/api/glasses/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur serveur");

      if (Array.isArray(data) && data.length > 0) {
        setRecommendations(data);
      } else {
        setError("Aucune recommandation trouvée.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-[160px] mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Trouver vos lunettes idéales</h1>

      <form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label className="block mb-2">Genre :</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Mixte">Mixte</option>
        </select>

        <label className="block mb-2">Âge :</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          required
        />

        <label className="block mb-2">Catégorie :</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="Repos">Repos</option>
          <option value="Soleil">Soleil</option>
          <option value="Natation">Natation</option>
          <option value="Lecture">Lecture</option>
        </select>

        <button type="submit" className="w-full bg-[#ffaf50] text-white py-2 rounded-md hover:bg-opacity-90 transition">
          Obtenir des recommandations
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-6">
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Lunettes recommandées :</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-500">{product.price} €</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommandations;
