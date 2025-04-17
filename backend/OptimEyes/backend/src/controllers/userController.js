import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// GET /api/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// POST /api/users/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("❌ Tous les champs sont requis");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Cet utilisateur existe déjà.");
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    res.status(400);
    throw new Error("❌ Données invalides.");
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,           // ← bien renvoyé dès l'inscription
    token: generateToken(user._id),
  });
});

// POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Identifiants invalides.");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin || false,  // ← renvoie toujours true/false
    token: generateToken(user._id),
  });
});

// GET /api/users/profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé.");
  }

  // désérialise et renvoie explicitement isAdmin
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,           // ← ici c’est CE champ qu’il faut renvoyer
  });
});

// GET /api/users/:id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }
  res.json(user);
});

// PUT /api/users/promote/:id
export const promoteToAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id || req.body.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }

  user.isAdmin = true;
  await user.save();

  // on renvoie un objet “propre”, sans le password ni autres champs internes
  res.json({
    message: "✅ Utilisateur promu admin avec succès",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});
