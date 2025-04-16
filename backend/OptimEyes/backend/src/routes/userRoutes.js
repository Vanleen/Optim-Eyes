import express from 'express';
import { 
    getAllUsers, 
    registerUser, 
    loginUser, 
    getUserProfile, 
    getUserById, 
    promoteToAdmin 
} from '../controllers/userController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js'; // ✅ regroupe tout ici


const router = express.Router();

// ✅ Route pour récupérer tous les utilisateurs (Admin seulement à l'avenir)
router.get('/', getAllUsers);

// ✅ Route d'inscription
router.post('/register', registerUser);
router.post('/signup', registerUser); // ✅ alias

// ✅ Route de connexion
router.post('/login', loginUser);

// ✅ Route pour récupérer le profil utilisateur (protégée)
router.get('/profile', protect, getUserProfile);

// ✅ Route pour récupérer un utilisateur par ID
router.get('/:id', protect, getUserById); // 🔥 Protégée également

// ✅ Route temporaire pour promouvoir un utilisateur en admin
router.put('/promote/:id', promoteToAdmin);

router.post("/make-admin", promoteToAdmin);

// ✅ Route pour récupérer tous les utilisateurs (admin uniquement)
router.get('/', protect, isAdmin, getAllUsers);


export default router;
