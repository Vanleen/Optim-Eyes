// frontend/src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const { register, loading }   = useAuth();
  const navigate                = useNavigate();

  const validatePassword = (pwd) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pwd);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      return setError("Tous les champs sont requis.");
    }

    if (!validatePassword(password)) {
      return setError(
        "Le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre."
      );
    }

    try {
      await register({ name, email, password });
      // ← redirection vers recommendations après inscription
      navigate("/recommendations");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Créer un compte</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {loading && <p className="text-blue-500 text-center mb-2">Création en cours...</p>}

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C7C0AE] text-white py-2 rounded-md hover:bg-opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-blue-600">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
