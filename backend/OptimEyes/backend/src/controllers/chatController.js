// backend/src/controllers/chatController.js
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
            content:
              "Tu es un expert en optique. Tu réponds uniquement à propos des yeux, lunettes, lentilles et examens visuels, en français, de façon concise et bienveillante.",
          },
          { role: "user", content: userMessage },
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
    return "Les yeux secs peuvent être soulagés avec des larmes artificielles.";
  if (msg.includes("yeux rouges"))
    return "Des yeux rouges peuvent indiquer une irritation. Consultez un spécialiste.";
  if (msg.includes("lunettes"))
    return "Je recommande des lunettes adaptées à votre vue. Un test chez un opticien est idéal.";
  return "Je n’arrive pas à répondre pour le moment.";
};

const isRecommendationRequest = (message) => {
  const keywords = ["lunettes", "verres", "monture", "recommande"];
  return keywords.some((k) => message.toLowerCase().includes(k));
};

const parseRecommendationFilters = (message) => {
  const categoryMap = {
    soleil: "Solaire",
    sport: "Sport",
    repos: "Repos",
    optique: "Optique",
    natation: "Natation",
  };

  let gender = null;
  let category = null;
  let recommendedAge = null;

  const msg = message.toLowerCase();

  if (msg.includes("homme")) gender = "Homme";
  else if (msg.includes("femme")) gender = "Femme";
  else if (msg.includes("enfant")) {
    gender = "Enfant";
    recommendedAge = 12;
  }

  Object.entries(categoryMap).forEach(([key, value]) => {
    if (msg.includes(key)) category = value;
  });

  return { gender, category, recommendedAge };
};

const generateChatbotResponse = async (userMessage) => {
  const cleaned = userMessage.trim().toLowerCase();

  if (isRecommendationRequest(cleaned)) {
    const filters = parseRecommendationFilters(cleaned);
    const query = {};

    if (filters.gender) query.gender = { $in: ["Mixte", filters.gender] };
    if (filters.category) query.category = filters.category;
    if (filters.recommendedAge) query.recommendedAge = { $lte: filters.recommendedAge };

    const glasses = await Glass.find(query).limit(3);

    if (glasses.length > 0) {
      return {
        type: "recommendation",
        response: glasses.map((g) => ({
          _id: g._id.toString(),
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

export const getChatHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
  res.json(messages);
});
