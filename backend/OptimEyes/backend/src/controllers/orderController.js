// backend/src/controllers/orderController.js

import asyncHandler from 'express-async-handler';
import Order        from '../models/Order.js';
import User         from '../models/User.js';
import Glass        from '../models/Glass.js';

// ✅ Créer une nouvelle commande
const createOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice, paymentMethod } = req.body;
  const userId = req.user._id; // depuis le token

  // Vérifier si tous les articles existent
  for (const item of items) {
    const glassExists = await Glass.findById(item.glassId);
    if (!glassExists) {
      return res.status(400).json({ message: `Lunette non trouvée pour ID: ${item.glassId}` });
    }
  }

  const order = await Order.create({
    userId,
    items,
    totalPrice,
    status: "En attente de paiement",
    paymentMethod,
    isPaid: false
  });

  res.status(201).json(order);
});

// ✅ Récupérer une commande par ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('userId', 'name email')
    .populate('items.glassId', 'name price imageUrl');

  if (!order) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  res.json(order);
});

// ✅ Mettre à jour le statut d'une commande
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  if (!['En cours', 'Payée', 'Expédiée', 'Annulée'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  order.status = status;
  if (status === "Payée") {
    order.isPaid = true;
    order.paidAt = Date.now();
  }
  await order.save();

  const updated = await order
    .populate('userId', 'name email')
    .populate('items.glassId', 'name price imageUrl')
    .execPopulate();

  res.json({ message: 'Statut mis à jour', order: updated });
});

// ✅ Récupérer toutes les commandes de l’utilisateur connecté
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .populate('items.glassId', 'name price imageUrl');
  res.json(orders);
});

// ✅ Récupérer toutes les commandes (Admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'name email')
    .populate('items.glassId', 'name price imageUrl');
  res.json(orders);
});

// ✅ Supprimer une commande (Admin)
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }
  await order.remove();
  res.json({ message: "Commande supprimée avec succès" });
});

export {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  deleteOrder
};
