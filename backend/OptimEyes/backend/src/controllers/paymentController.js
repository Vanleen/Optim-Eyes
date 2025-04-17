// backend/src/controllers/paymentController.js
import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Fallback sur le frontend si la variable d’env n’est pas définie
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

paypal.configure({
  mode: 'sandbox', // ou 'live' en production
  client_id:     process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
});

// ── Création d’une Stripe Checkout Session ─────────────────────────────────
export const payWithStripe = async (req, res) => {
  const { items } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Le panier est vide' });
  }

  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${frontendUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${frontendUrl}/panier`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ message: 'Erreur lors de la création de session Stripe' });
  }
};

// ── Création d’un paiement PayPal (optionnel) ───────────────────────────────
export const payWithPayPal = async (req, res) => {
  const { amount, currency } = req.body;

  const paymentJson = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [
      {
        amount: { total: amount.toString(), currency },
        description: 'Achat de lunettes',
      },
    ],
    redirect_urls: {
      return_url: `${frontendUrl}/success`,
      cancel_url:  `${frontendUrl}/cancel`,
    },
  };

  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error('PayPal Error:', error);
      return res.status(500).json({ message: error.message });
    }
    const approvalUrl = payment.links.find(l => l.rel === 'approval_url')?.href;
    res.json({ approvalUrl });
  });
};

// ── Confirmation du paiement et mise à jour de la commande ────────────────
export const confirmPayment = async (req, res) => {
  const { orderId, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status        = 'Payée';
    order.paymentMethod = paymentMethod;
    order.isPaid        = true;
    order.paidAt        = Date.now();
    const updatedOrder  = await order.save();

    res.json({
      message: 'Paiement confirmé et commande mise à jour',
      order:   updatedOrder,
    });
  } catch (error) {
    console.error('ConfirmPayment Error:', error);
    res.status(500).json({ message: error.message });
  }
};
