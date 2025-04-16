import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 🔥 Vérification avec le bon secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Utilisateur non trouvé.");
      }

      next();
    } catch (error) {
      console.error("❌ Erreur de token:", error.message);
      res.status(401);
      throw new Error("Non autorisé, token invalide.");
    }
  } else {
    res.status(401);
    throw new Error("Non autorisé, aucun token fourni.");
  }
});

// ✅ Vérifie si l'utilisateur est admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé : admin uniquement" });
  }
};

export { protect };
