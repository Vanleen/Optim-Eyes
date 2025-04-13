import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paypal.configure({
    mode: 'sandbox', // Utilise "live" pour la production
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET
});

// ✅ Créer un paiement avec Stripe
export const payWithStripe = async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convertir en cents
            currency,
            payment_method_types: ['card']
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Créer un paiement avec PayPal
export const payWithPayPal = async (req, res) => {
    const { amount, currency } = req.body;

    const paymentJson = {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        transactions: [{ amount: { total: amount, currency }, description: 'Achat de lunettes' }],
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        }
    };

    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            res.json({ approvalUrl: payment.links[1].href });
        }
    });
};

// ✅ Confirmer le paiement et mettre à jour la commande
export const confirmPayment = async (req, res) => {
    const { orderId, paymentMethod } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        order.status = 'Payée';
        order.paymentMethod = paymentMethod;
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();

        res.json({ message: 'Paiement confirmé et commande mise à jour', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
