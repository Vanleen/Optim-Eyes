// backend/src/controllers/visionDiagnosisController.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Fallback IA via OpenRouter avec prompt spécialisé
const fallbackWithOpenRouter = async (imageBase64) => {
  try {
    console.log("🧠 Fallback IA via OpenRouter");

    const prompt = `
Tu es un ophtalmologue IA. Voici une image d'œil encodée en base64.

Base64 image (partielle) :
${imageBase64.slice(0, 300)}...

Analyse l’image de manière professionnelle et retourne uniquement ces informations :

- Le nom de la pathologie détectée (ou "aucune anomalie détectée").
- Un niveau de probabilité (faible, modérée, élevée).
- Une recommandation (ex : consulter un spécialiste, hydratation, etc).

Ta réponse doit suivre le format JSON :
{
  "diagnostic": "Nom de la pathologie",
  "probabilite": "modérée",
  "recommandation": "texte clair"
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(raw || "{}");

    return {
      message: "Diagnostic réalisé avec IA OpenRouter",
      diagnostic: parsed.diagnostic || "Inconnu",
      probabilité: parsed.probabilite || "Non précisé",
      conseil: parsed.recommandation || "Consulter un professionnel",
    };
  } catch (error) {
    console.error("❌ OpenRouter KO :", error.message);
    return null;
  }
};

export const diagnoseEyeHealth = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image fournie." });
    }

    const imagePath = path.resolve("uploads", req.file.filename);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const roboflowUrl = `${process.env.ROBOFLOW_DIAG_MODEL_URL}?api_key=${process.env.ROBOFLOW_API_KEY}`;
    console.log("📤 Envoi de l'image à Roboflow...");

    const response = await axios.post(roboflowUrl, formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("✅ Réponse Roboflow :", response.data);

    const predictions = response.data?.predictions;
    if (!predictions || predictions.length === 0) {
      console.warn("⚠️ Aucune prédiction Roboflow, fallback IA OpenRouter...");

      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      const fallbackResult = await fallbackWithOpenRouter(imageBase64);

      return fallbackResult
        ? res.json(fallbackResult)
        : res
            .status(400)
            .json({ message: "Aucun diagnostic détecté, même via IA." });
    }

    const best = predictions[0];
    const probability = (best.confidence * 100).toFixed(2);
    const conseil =
      "⚠️ Ce diagnostic est une estimation. Il est conseillé de consulter un ophtalmologue pour confirmation.";

    res.json({
      message: "Diagnostic réalisé avec Roboflow",
      diagnostic: best.class,
      probabilité: `${probability}%`,
      conseil,
    });
  } catch (err) {
    console.error("Erreur générale :", err.message);
    res.status(500).json({ message: "Erreur lors du diagnostic." });
  }
};
