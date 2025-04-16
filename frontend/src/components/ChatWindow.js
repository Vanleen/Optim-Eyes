import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronsDown, FiRefreshCcw } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour 👋! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  const token = localStorage.getItem("token");
  const maxFreeQuestions = 2;
  const isBlocked = !token && questionCount >= maxFreeQuestions;

  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    if (productId) navigate(`/product/${productId}`);
  };

  const containsKeywords = (text) => {
    const keywords = ["lunette", "monture", "verres", "verre"];
    const normalized = text.toLowerCase();
    return keywords.some((kw) => normalized.includes(kw));
  };

  const sendMessage = async () => {
    if (!input.trim() || isBlocked) return;

    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setQuestionCount((prev) => prev + 1);

    try {
      const response = await axios.post(
        "https://optim-eyes.onrender.com/api/chat",
        { message: input },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      const botResponse = response.data.response;
      const isRecommendation = response.data.type === "recommendation";
      const autoSuggest = containsKeywords(input);

      const newBotMessages = [];

      if (isRecommendation) {
        newBotMessages.push({
          sender: "bot",
          type: "recommendation",
          items: botResponse,
        });
      } else {
        newBotMessages.push({ sender: "bot", text: botResponse });
      }

      if (autoSuggest) {
        newBotMessages.push({
          sender: "bot",
          type: "link",
          text: "Voici quelques modèles que je te recommande !",
          url: "/recommandations",
        });
      }

      setMessages([...newMessages, ...newBotMessages]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "❌ L'IA ne répond pas pour le moment. Réessayez plus tard.",
        },
      ]);
    }
  };

  const resetChat = () => {
    setMessages([
      { sender: "bot", text: "Bonjour 👋! Comment puis-je vous aider ?" },
    ]);
    setQuestionCount(0);
    setInput("");
  };

  const formatImageUrl = (url) =>
    url?.startsWith("http") ? url : `https://optim-eyes.onrender.com${url}`;

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-96 bg-white shadow-xl rounded-xl overflow-hidden z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-3 flex items-center border-b border-gray-300">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center relative"
          style={{
            backgroundColor: "black",
            border: "2px solid white",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={`orange-${i}`}
              className="absolute w-2 h-2 bg-[#ffaf50] rounded-full"
              animate={{
                x: [Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random(),
                ease: "easeInOut",
              }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={`blue-${i}`}
              className="absolute w-2 h-2 bg-[#0077B6] rounded-full"
              animate={{
                x: [Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5 + Math.random(),
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <span className="font-semibold text-gray-800 ml-3">
          Optim’Eyes Chatbot
        </span>

        <button
          onClick={resetChat}
          className="ml-auto mr-3 text-gray-600 hover:text-[#0077B6] transition"
        >
          <FiRefreshCcw size={22} />
        </button>

        <button
          onClick={onClose}
          className="text-gray-600 hover:text-[#0077B6] transition"
        >
          <FiChevronsDown size={22} />
        </button>
      </div>

      <div className="p-4 h-80 overflow-y-auto space-y-2 bg-white">
        {messages.map((msg, index) => {
          if (msg.type === "recommendation") {
            return (
              <div key={index} className="space-y-2">
                {msg.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-2 bg-gray-50 hover:bg-gray-100 cursor-pointer shadow"
                    onClick={() => handleCardClick(item._id)}
                  >
                    <img
                      src={formatImageUrl(item.imageUrl)}
                      alt={item.name}
                      className="w-full h-32 object-contain mb-2 rounded"
                    />
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.brand}</div>
                    <div className="text-sm text-gray-700">{item.price}€</div>
                  </div>
                ))}
              </div>
            );
          }

          if (msg.type === "link") {
            return (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg text-left space-y-2"
              >
                <p>{msg.text}</p>
                <Link
                  to={msg.url}
                  className="inline-block px-4 py-2 bg-[#ffaf50] text-white rounded hover:bg-[#e69940] text-sm"
                >
                  Voir mes recommandations
                </Link>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              {msg.text}
            </div>
          );
        })}

        {isBlocked && (
          <div className="text-center text-sm text-red-600 mt-4">
            🔒 Vous avez atteint la limite de 2 questions gratuites.
            <br />
            <Link to="/login" className="underline text-blue-600">
              Connectez-vous
            </Link>{" "}
            ou{" "}
            <Link to="/signup" className="underline text-blue-600">
              créez un compte
            </Link>{" "}
            pour continuer.
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-full p-2 border border-gray-200 rounded-lg shadow-inner bg-gray-100"
          placeholder={
            isBlocked
              ? "Connectez-vous pour continuer..."
              : "Écrivez un message..."
          }
          disabled={isBlocked}
        />
      </div>
    </motion.div>
  );
};

export default ChatWindow;
