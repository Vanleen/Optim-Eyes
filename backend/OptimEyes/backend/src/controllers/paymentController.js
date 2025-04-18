import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import axios from 'axios';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Glass from '../models/Glass.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Payer avec Stripe
const payWithStripe = asyncHandler(async (req, res) => {
  const { userId, glassId, quantity, paymentMethod } = req.body;

  // Vérification utilisateur
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé.' });
  }

  // Vérification lunette
  const glass = await Glass.findById(glassId);
  if (!glass) {
    return res.status(400).json({ message: 'Lunette non trouvée.' });
  }

  const priceInCents = Math.round(glass.price * 100);
  const amount = priceInCents * quantity;

  // Création de la commande
  const order = await Order.create({
    userId,
    items: [{ glassId, quantity }],
    totalPrice: glass.price * quantity,
    status: 'En attente de paiement',
    paymentMethod: paymentMethod || 'stripe',
    isPaid: false
  });

  // Création de session Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: glass.name,
        },
        unit_amount: priceInCents,
      },
      quantity,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    metadata: { orderId: order._id.toString() }
  });

  res.status(200).json({ url: session.url });
});

// ✅ Payer avec PayPal
const payWithPayPal = asyncHandler(async (req, res) => {
  const { userId, glassId, quantity, paymentMethod } = req.body;

  const user = await User.findById(userId);
  const glass = await Glass.findById(glassId);

  if (!user || !glass) {
    return res.status(400).json({ message: 'Utilisateur ou lunette introuvable.' });
  }

  const total = (glass.price * quantity).toFixed(2);

  // Création de commande
  const order = await Order.create({
    userId,
    items: [{ glassId, quantity }],
    totalPrice: total,
    status: 'En attente de paiement',
    paymentMethod: paymentMethod || 'paypal',
    isPaid: false
  });

  // Authentification PayPal
  const basicAuth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const tokenRes = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const accessToken = tokenRes.data.access_token;

  // Création d’une commande PayPal
  const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'EUR',
        value: total
      },
      description: glass.name
    }],
    application_context: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    }
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  const approvalLink = response.data.links.find(link => link.rel === 'approve')?.href;
  res.status(200).json({ url: approvalLink });
});

// ✅ Confirmer le paiement (manuellement pour mise à jour du statut)
const confirmPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Commande introuvable" });

  order.status = 'Payée';
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();

  res.json({ message: 'Commande marquée comme payée.', order });
});

export {
  payWithStripe,
  payWithPayPal,
  confirmPayment
};
