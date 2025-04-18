// backend/src/routes/paymentRoutes.js

import express from 'express';
import {
  payWithStripe,
  getCheckoutSession,
  payWithPayPal,
  confirmPayment
} from '../controllers/paymentController.js';

const router = express.Router();

// ➡️ Récupérer une session Stripe par ID
router.get('/stripe/session/:sessionId', getCheckoutSession);

// Paiement Stripe
router.post('/stripe', payWithStripe);

// Paiement PayPal
router.post('/paypal', payWithPayPal);

// Confirmer un paiement et mettre à jour la commande
router.put('/confirm', confirmPayment);

export default router;
