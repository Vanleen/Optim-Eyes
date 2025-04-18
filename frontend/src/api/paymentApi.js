// frontend/src/api/paymentApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Crée une session Stripe Checkout hébergée pour un seul article.
 * @param {{ userId: string, glassId: string, quantity: number }} opts
 * @returns {Promise<{ url: string }>} l'URL de redirection vers Stripe
 */
export const createStripeSession = async ({ userId, glassId, quantity }) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/payments/stripe`,
      { userId, glassId, quantity, paymentMethod: 'stripe' }
    );
    return resp.data; // { url: "https://checkout.stripe.com/..." }
  } catch (err) {
    console.error("Erreur createStripeSession:", err.response?.data || err.message);
    throw err;
  }
};
