import express from 'express';
import { payWithStripe, payWithPayPal, confirmPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Paiement Stripe
router.post('/stripe', payWithStripe);

// Paiement PayPal
router.post('/paypal', payWithPayPal);

// Confirmer un paiement et mettre à jour la commande
router.put('/confirm', confirmPayment);

export default router;