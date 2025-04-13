import asyncHandler from "express-async-handler";
import axios from "axios";
import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";
import Glass from "../models/Glass.js";

const useAI = !!process.env.OPENROUTER_API_KEY;

const fetchOpenRouterResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en ophtalmologie et optique. Tu réponds toujours en français, de façon claire, bienveillante et concise. Tu ne réponds qu'aux questions sur les yeux, la vue, les lunettes, les lentilles, les examens visuels ou les maladies oculaires.",

          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0]?.message?.content || null;
    return reply;
  } catch (error) {
    console.error("❌ Erreur OpenRouter :", error.response?.data || error.message);
    return null;
  }
};

const getFallbackResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  if (msg.includes("yeux secs"))
    return "Les yeux secs peuvent être soulagés avec des larmes artificielles. Consultez un ophtalmologue si les symptômes persistent.";
  if (msg.includes("yeux rouges"))
    return "Des yeux rouges peuvent indiquer une irritation ou une conjonctivite. Évitez de vous frotter les yeux et consultez un spécialiste.";
  if (msg.includes("lunettes"))
    return "Je recommande des lunettes adaptées à votre correction visuelle. Faites un test de vue chez un opticien ou un ophtalmologue.";
  return "Je n’arrive pas à répondre pour le moment.";
};

const isRecommendationRequest = (message) => {
  const keywords = ["lunettes", "verres", "monture", "recommande"];
  return keywords.some((k) => message.toLowerCase().includes(k));
};

const generateChatbotResponse = async (userMessage) => {
  const cleaned = userMessage.trim().toLowerCase();

  if (isRecommendationRequest(cleaned)) {
    const glasses = await Glass.find().limit(3);
    if (glasses.length > 0) {
      return {
        type: "recommendation",
        response: glasses.map((g) => ({
          name: g.name,
          brand: g.brand,
          price: g.price,
          description: g.description,
          imageUrl: g.imageUrl,
        })),
      };
    }

    return {
      type: "text",
      response: "Je n’ai pas encore de recommandations disponibles.",
    };
  }

  if (useAI) {
    const aiResponse = await fetchOpenRouterResponse(userMessage);
    if (aiResponse) {
      return { type: "ai", response: aiResponse };
    }
  }

  const fallbackResponse = getFallbackResponse(userMessage);
  return { type: "fallback", response: fallbackResponse };
};

export const sendMessageToChatbot = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Message manquant." });
  }

  let user = null;
  let isGuest = false;

  if (userId) {
    user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }
  } else {
    isGuest = true;
  }

  const chatbotResponse = await generateChatbotResponse(message);

  if (!isGuest) {
    await ChatMessage.create({
      userId,
      message,
      response:
        typeof chatbotResponse.response === "object"
          ? JSON.stringify(chatbotResponse.response)
          : chatbotResponse.response,
    });
  }

  res.status(201).json({
    userId: user?._id || null,
    message,
    response: chatbotResponse.response,
    type: chatbotResponse.type,
  });
});

/*
🧱 Ancienne version (auth obligatoire uniquement) :

export const sendMessageToChatbot = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé.' });
  }

  const chatbotResponse = await generateChatbotResponse(message);

  await ChatMessage.create({
    userId,
    message,
    response:
      typeof chatbotResponse.response === 'object'
        ? JSON.stringify(chatbotResponse.response)
        : chatbotResponse.response,
  });

  res.status(201).json({
    userId,
    message,
    response: chatbotResponse.response,
    type: chatbotResponse.type,
  });
});
*/

export const getChatHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
  res.json(messages);
});
