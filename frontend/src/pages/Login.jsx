import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 Ajouté

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useAuth(); // 👈 Depuis le context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("Tous les champs sont requis.");
    }

    try {
      await login(formData); // 👈 Appel context
      navigate("/");
    } catch (err) {
      setError(err.message || "Identifiants invalides.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>

        {error && <p className="text-red-500 text-center mb-2">{error.toString()}</p>}
        {loading && <p className="text-blue-500 text-center mb-2">Connexion en cours...</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C7C0AE] text-white py-2 rounded-md hover:bg-opacity-90 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Pas encore de compte ?{" "}
          <Link to="/signup" className="text-blue-600">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
