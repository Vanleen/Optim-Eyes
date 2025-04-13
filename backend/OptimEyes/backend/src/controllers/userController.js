import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js'; // 🔥 Importation du token JWT

// ✅ Récupérer tous les utilisateurs
export const getAllUsers = asyncHandler(async (req, res) => {
    console.log("📌 Requête reçue: GET /api/users");
    const users = await User.find().select('-password'); // Exclut les mots de passe
    res.json(users);
});

// ✅ Inscription utilisateur (avec génération du token)
export const registerUser = asyncHandler(async (req, res) => {
    console.log("📌 Requête reçue: POST /api/users/register", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("❌ Tous les champs sont requis");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log("⚠️ Utilisateur déjà existant:", email);
        res.status(400);
        throw new Error("Cet utilisateur existe déjà.");
    }

    const user = await User.create({ name, email, password });

    if (user) {
        console.log("✅ Utilisateur créé:", user);
        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) // ✅ Génération du JWT
        });
    } else {
        res.status(400);
        throw new Error("❌ Données invalides.");
    }
});

// ✅ Connexion utilisateur (avec génération du token)
export const loginUser = asyncHandler(async (req, res) => {
    console.log("📌 Requête reçue: POST /api/users/login", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        console.log("✅ Connexion réussie:", user.email);
        res.json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email,
            token: generateToken(user._id) // ✅ Génération du JWT
        });
    } else {
        console.log("❌ Identifiants invalides pour:", email);
        res.status(401);
        throw new Error("Identifiants invalides.");
    }
});

// ✅ Récupération du profil utilisateur (protégé par authentification)
export const getUserProfile = asyncHandler(async (req, res) => {
    console.log("📌 Requête reçue: GET /api/users/profile");

    const user = await User.findById(req.user._id);

    if (user) {
        res.json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

// ✅ Récupérer un utilisateur par ID
export const getUserById = asyncHandler(async (req, res) => {
    console.log(`📌 Requête reçue: GET /api/users/${req.params.id}`);

    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});
