import asyncHandler from 'express-async-handler';
import axios from 'axios';

// 🔍 Détection forme visage via Face++
export const detectFaceShape = asyncHandler(async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'URL de l’image manquante' });
    }

    try {
        const response = await axios.post(
            `https://api-us.faceplusplus.com/facepp/v3/detect`,
            null,
            {
                params: {
                    api_key: process.env.FACE_PLUS_PLUS_API_KEY,
                    api_secret: process.env.FACE_PLUS_PLUS_API_SECRET,
                    image_url: imageUrl,
                    return_attributes: 'face_shape'
                }
            }
        );

        const shape = response.data.faces[0]?.attributes?.face_shape?.value;

        res.status(200).json({
            message: 'Forme de visage détectée',
            shape,
            suggestion: suggestGlasses(shape)
        });
    } catch (error) {
        console.error('❌ Erreur Face++ :', error.message);
        res.status(500).json({ message: 'Erreur lors de la détection du visage' });
    }
});

// ✅ Suggestions selon forme
const suggestGlasses = (shape) => {
    const suggestions = {
        oval: "Tous les styles conviennent, surtout les montures carrées ou géométriques.",
        round: "Privilégiez les montures angulaires ou rectangulaires.",
        square: "Les montures rondes ou ovales adouciront vos traits.",
        heart: "Préférez des montures fines, arrondies ou papillon.",
        triangle: "Optez pour des montures larges en haut comme les aviators."
    };
    return suggestions[shape?.toLowerCase()] || "Forme non reconnue, essayez une autre photo.";
};
