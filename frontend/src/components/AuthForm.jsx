import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AuthForm = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {type === "login" ? "Connexion" : "Inscription"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Champ Nom (uniquement pour l'inscription) */}
          {type === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                type="text"
                {...register("name", { required: "Le nom est requis" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
          )}

          {/* Champ Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Format d'email invalide"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Champ Mot de Passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              {...register("password", {
                required: "Mot de passe requis",
                minLength: { value: 6, message: "Au moins 6 caractères" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Doit contenir au moins une lettre et un chiffre"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Bouton Submit */}
          <button
            type="submit"
            className="w-full bg-[#C7C0AE] text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            {type === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        {/* Lien vers l'autre page */}
        <p className="text-sm text-center mt-4">
          {type === "login" ? (
            <>
              Pas encore de compte ? <Link to="/signup" className="text-blue-600">S'inscrire</Link>
            </>
          ) : (
            <>
              Déjà un compte ? <Link to="/login" className="text-blue-600">Se connecter</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
