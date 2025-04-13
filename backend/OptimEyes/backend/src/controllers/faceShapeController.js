import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';
import { fileURLToPath } from 'url';

// Pour que __dirname fonctionne avec ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping forme → suggestion de montures
const shapeToSuggestion = {
  oval: "Presque toutes les montures te vont, surtout les formes carrées ou rectangulaires.",
  round: "Privilégie des montures angulaires pour structurer ton visage.",
  square: "Opte pour des montures rondes pour adoucir ton visage.",
  heart: "Choisis des montures fines, ovales ou arrondies.",
  long: "Les montures larges ou décorées en haut équilibreront ton visage.",
  triangle: "Montures larges en haut, comme les aviators.",
};

export const detectFaceShape = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    const roboflowResponse = await axios.post(
      `${process.env.ROBOFLOW_MODEL_URL}?api_key=${process.env.ROBOFLOW_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    const prediction = roboflowResponse?.data?.predictions?.[0]?.class;

    if (prediction && shapeToSuggestion[prediction]) {
      return res.json({
        message: "Forme détectée avec Roboflow",
        faceShape: prediction,
        suggestion: shapeToSuggestion[prediction]
      });
    }

    // Fallback si aucune prédiction valide
    return fallbackResponse(res);

  } catch (error) {
    console.error("Erreur Roboflow :", error?.response?.data || error.message);
    return fallbackResponse(res);
  } finally {
    // Nettoyage du fichier temporaire
    fs.unlinkSync(req.file.path);
  }
};

const fallbackResponse = (res) => {
  const fallbackShape = "square";
  return res.json({
    message: "Forme détectée avec Fallback",
    faceShape: fallbackShape,
    suggestion: shapeToSuggestion[fallbackShape]
  });
};
