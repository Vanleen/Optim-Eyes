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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {type === "login" ? "Connexion" : "Inscription"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "L'email est requis" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Champ Mot de Passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Mot de passe requis", minLength: 6 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Bouton Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
