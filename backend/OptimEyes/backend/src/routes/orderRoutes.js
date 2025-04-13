import express from 'express';
import { createOrder, getOrderById, updateOrderStatus, getMyOrders, getAllOrders, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Créer une commande
router.post('/', createOrder);

// Obtenir une commande par ID
router.get('/:id', getOrderById);

// Mettre à jour une commande après paiement
router.put('/:id/status', updateOrderStatus);

// Récupérer toutes les commandes (Admin)
router.get('/', getAllOrders);

// Récupérer les commandes d’un utilisateur
router.get('/user/:userId', getMyOrders);

// Supprimer une commande par ID
router.delete('/:id', deleteOrder);

export default router;
