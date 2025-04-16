// backend/src/middleware/adminMiddleware.js
import asyncHandler from 'express-async-handler';

export const isAdmin = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // ✅ OK, passe à la suite
  } else {
    res.status(401);
    throw new Error('Non autorisé : accès admin requis');
  }
});
