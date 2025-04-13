import express from 'express';
import { 
    getAllUsers, 
    registerUser, 
    loginUser, 
    getUserProfile, 
    getUserById 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Route pour récupérer tous les utilisateurs (Admin seulement à l'avenir)
router.get('/', getAllUsers);

// ✅ Route d'inscription
router.post('/register', registerUser);

// ✅ Route de connexion
router.post('/login', loginUser);

// ✅ Route pour récupérer le profil utilisateur (protégée)
router.get('/profile', protect, getUserProfile);

// ✅ Route pour récupérer un utilisateur par ID
router.get('/:id', protect, getUserById); // 🔥 Protégée également

export default router;
