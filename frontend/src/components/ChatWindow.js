import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronsDown, FiRefreshCcw } from "react-icons/fi";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour 👋! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  const token = localStorage.getItem("token");
  const maxFreeQuestions = 2;
  const isBlocked = !token && questionCount >= maxFreeQuestions;

  const sendMessage = async () => {
    if (!input.trim() || isBlocked) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setQuestionCount((prev) => prev + 1);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input },
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : undefined
      );

      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.response }, // ✅ fix ici
      ]);
    } catch (error) {
      console.error("Erreur chatbot :", error);
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

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-96 bg-white shadow-xl rounded-xl overflow-hidden"
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
        {messages.map((msg, index) => (
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
        ))}

        {isBlocked && (
          <div className="text-center text-sm text-red-600 mt-4">
            🔒 Vous avez atteint la limite de 2 questions gratuites.<br />
            <a href="/login" className="underline text-blue-600">
              Connectez-vous
            </a>{" "}
            ou{" "}
            <a href="/signup" className="underline text-blue-600">
              créez un compte
            </a>{" "}
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
