// frontend/src/api/paymentApi.js
import axios from 'axios';

console.log("▶ paymentApi utilisant API_URL =", process.env.REACT_APP_API_URL);

const API_URL = process.env.REACT_APP_API_URL;
console.log("→ paymentApi using API_URL =", API_URL);

export const createStripeCheckoutSession = async (items) => {
  console.log("→ createStripeCheckoutSession items:", items);
  try {
    const resp = await axios.post(
      `${API_URL}/api/payments/stripe`,
      { items }
    );
    console.log("← create session response:", resp.data);
    return resp.data; // { sessionId }
  } catch (err) {
    // logue toute la réponse d’erreur
    console.error("✖︎ createStripeCheckoutSession error:", err.response?.data ?? err);
    throw err;
  }
};
