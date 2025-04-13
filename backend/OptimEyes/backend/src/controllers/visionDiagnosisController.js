import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const fallbackWithChatGPT = async (imageBase64) => {
  try {
    console.log("🧠 Tentative de fallback avec ChatGPT...");
    const prompt = `Tu es un ophtalmologue. Diagnostique cette image d’œil encodée en base64 : ${imageBase64.slice(0, 100)}...`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      message: "Diagnostic réalisé avec ChatGPT (fallback)",
      diagnostic: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("❌ ChatGPT KO :", error.message);
    try {
      console.log("🤖 Tentative de fallback avec DeepSeek...");
      const deepseek = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: `Diagnostique cette image base64 (œil) : ${imageBase64.slice(0, 100)}...`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          },
        }
      );

      return {
        message: "Diagnostic réalisé avec DeepSeek (fallback)",
        diagnostic: deepseek.data.choices[0].message.content,
      };
    } catch (err) {
      console.error("❌ DeepSeek KO :", err.message);
      return null;
    }
  }
};

export const diagnoseEyeHealth = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image fournie." });
    }

    const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const roboflowUrl = `${process.env.ROBOFLOW_DIAG_MODEL_URL}?api_key=${process.env.ROBOFLOW_API_KEY}`;
    console.log("📤 Envoi de l'image à Roboflow...");

    const response = await axios.post(roboflowUrl, formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Réponse Roboflow :", response.data);

    const predictions = response.data?.predictions;
    if (!predictions || predictions.length === 0) {
      console.warn("⚠️ Aucune prédiction Roboflow, fallback IA...");

      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      const fallbackResult = await fallbackWithChatGPT(imageBase64);

      return fallbackResult
        ? res.json(fallbackResult)
        : res.status(400).json({ message: "Aucun diagnostic détecté." });
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
    res.status(500).json({ message: "Erreur serveur." });
  }
};
