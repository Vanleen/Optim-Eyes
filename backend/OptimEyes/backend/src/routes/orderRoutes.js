// backend/src/routes/orderRoutes.js

import express           from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAllOrders,
  deleteOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Routes pour "Mon compte" (utilisateur connecté)
router.use(protect);
router.post('/',           createOrder);
router.get('/myorders',    getMyOrders);

// Routes pour Admin
router.use(admin);
router.get('/',            getAllOrders);
router.delete('/:id',      deleteOrder);

// Routes mixées (protect appliqué plus haut)
router.get('/:id',         getOrderById);
router.put('/:id/status',  updateOrderStatus);

export default router;
