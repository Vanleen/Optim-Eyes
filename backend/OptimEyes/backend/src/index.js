// backend/OptimEyes/backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './src/routes/userRoutes.js';
import glassRoutes from './src/routes/glassesRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Création du dossier 'uploads' à la racine (PAS dans src/)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ Sert les images uploadées
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes API
app.use('/api/users', userRoutes);
app.use('/api/glasses', glassRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('🎉 Backend OptimEyes opérationnel !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
