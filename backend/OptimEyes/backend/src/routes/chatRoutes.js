import express from 'express';
import { sendMessageToChatbot, getChatHistory } from '../controllers/chatController.js';

const router = express.Router();

// Envoyer un message au chatbot
router.post('/', sendMessageToChatbot);

// Récupérer l'historique des messages d'un utilisateur
router.get('/history/:userId', getChatHistory);

export default router;
