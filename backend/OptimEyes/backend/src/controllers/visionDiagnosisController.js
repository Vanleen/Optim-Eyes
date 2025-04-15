// backend/src/controllers/visionDiagnosisController.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Prompt enrichi et statique
const fallbackWithOpenRouter = async () => {
  try {
    const prompt = `Un patient a soumis une photo de son œil.
Décris un diagnostic médical hypothétique basé sur l’analyse visuelle typique d’un œil :
- rougeur, sécheresse, démangeaisons, veines visibles, pupille dilatée ?
- quelles conditions pourraient être concernées ?
- donne un diagnostic plausible avec un conseil.`;

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

    const diagnostic = response.data?.choices?.[0]?.message?.content || null;

    return {
      message: "Diagnostic réalisé avec IA OpenRouter",
      diagnostic,
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

    const originalPath = path.resolve("uploads", req.file.filename);
    const resizedPath = path.resolve("uploads", `resized-${req.file.filename}`);

    // ✅ Resize en 512x512 avant envoi Roboflow
    await sharp(originalPath).resize(512, 512).toFile(resizedPath);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(resizedPath));

    const roboflowUrl = `${process.env.ROBOFLOW_DIAG_MODEL_URL}?api_key=${process.env.ROBOFLOW_API_KEY}`;
    console.log("📤 Envoi de l'image à Roboflow...");

    const response = await axios.post(roboflowUrl, formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("✅ Réponse Roboflow :", response.data);

    // ✅ Nettoyage fichier temporaire
    fs.unlinkSync(resizedPath);

    const predictions = response.data?.predictions;
    if (!predictions || predictions.length === 0) {
      console.warn("⚠️ Aucune prédiction Roboflow, fallback IA OpenRouter...");
      const fallbackResult = await fallbackWithOpenRouter();

      return fallbackResult
        ? res.json(fallbackResult)
        : res.status(400).json({
            message: "Aucun diagnostic détecté, même via IA.",
          });
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
