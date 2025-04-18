// backend/src/routes/orderRoutes.js

import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  deleteOrder
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Toutes les routes nécessitent d'être authentifié
router.use(protect);

// Créer une commande
router.post('/', createOrder);

// Récupérer ses propres commandes
router.get('/myorders', getMyOrders);

// Détail d’une commande
router.get('/:id', getOrderById);

// Mettre à jour le statut d’une commande
router.put('/:id/status', updateOrderStatus);

// Les routes suivantes sont réservées aux admins
router.use(isAdmin);

// Récupérer toutes les commandes (admin)
router.get('/', getAllOrders);

// Supprimer une commande (admin)
router.delete('/:id', deleteOrder);

export default router;
