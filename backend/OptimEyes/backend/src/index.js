// backend/src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import glassRoutes from './routes/glassesRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Créer le dossier d’uploads s’il n’existe pas (important pour Render !)
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Sert les fichiers statiques
app.use('/uploads', express.static(uploadPath));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/glasses', glassRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ai', aiRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🎉 Backend OptimEyes opérationnel !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
