import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI est manquant dans le fichier .env");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Erreur MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
