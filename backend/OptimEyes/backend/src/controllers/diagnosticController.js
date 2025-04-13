import asyncHandler from 'express-async-handler';
import axios from 'axios';

// 🔍 Analyse d'image via Roboflow
export const analyzeEyeImage = asyncHandler(async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'URL de l’image manquante' });
    }

    try {
        const response = await axios.post(
            `https://detect.roboflow.com/eye-diagnosis/1`,
            { image: imageUrl },
            {
                params: { api_key: process.env.ROBOFLOW_API_KEY },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        res.status(200).json({
            message: 'Diagnostic réussi',
            prediction: response.data
        });
    } catch (error) {
        console.error('❌ Erreur Roboflow :', error.message);
        res.status(500).json({ message: 'Erreur lors du diagnostic visuel' });
    }
});
