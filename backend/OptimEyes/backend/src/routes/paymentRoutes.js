// backend/routes/paymentRoutes.js
import express from 'express';
import {
  payWithStripe,
  payWithPayPal,
  confirmPayment
} from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/payments/stripe
router.post('/stripe', payWithStripe);

// POST /api/payments/paypal
router.post('/paypal', payWithPayPal);

// PUT  /api/payments/confirm
router.put('/confirm', confirmPayment);

export default router;
