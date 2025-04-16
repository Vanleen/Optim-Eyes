// backend/src/routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserProfile,
  getUserById,
  promoteToAdmin
} from '../controllers/userController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// 🔐 Authentification & Compte
router.post('/register', registerUser);
router.post('/signup', registerUser); // alias
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// 👤 Utilisateur par ID
router.get('/:id', protect, getUserById);

// 🛡️ Admin : tous les users
router.get('/', protect, isAdmin, getAllUsers);

// 🚀 Promotion temporaire
router.put('/promote/:id', promoteToAdmin);
router.post('/make-admin', promoteToAdmin);

// 🧪 Route de debug temporaire pour vérifier isAdmin
router.get('/check-admin/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    console.error('Erreur check-admin:', err);
    res.status(500).json({ message: 'Erreur lors de la vérification admin' });
  }
});

export default router;
