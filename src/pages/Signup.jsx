import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setError("Tous les champs sont requis");
    }
    if (!validatePassword(formData.password)) {
      return setError("Le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre.");
    }

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Créer un compte</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#C7C0AE] text-white py-2 rounded-md hover:bg-opacity-90 transition">
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Vous avez déjà un compte ? <Link to="/login" className="text-blue-600">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
