import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronsDown, FiRefreshCcw } from "react-icons/fi"; // ✅ Ajout de l’icône rafraîchir

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour 👋! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Erreur lors de la communication avec le chatbot", error);
    }
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-96 bg-white shadow-xl rounded-xl overflow-hidden" // ✅ Légèrement arrondi
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* En-tête du chatbot */}
      <div className="bg-white p-3 flex items-center border-b border-gray-300">
        {/* ✅ Orbe animée identique */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center relative"
          style={{
            backgroundColor: "black",
            border: "2px solid white",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {/* ✅ Particules orange et bleues */}
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

        {/* ✅ Texte Optim’Eyes Chatbot */}
        <span className="font-semibold text-gray-800 ml-3">
          Optim’Eyes Chatbot
        </span>

        {/* 🔄 Bouton rafraîchir */}
        <button
          onClick={() =>
            setMessages([
              {
                sender: "bot",
                text: "Bonjour 👋! Comment puis-je vous aider ?",
              },
            ])
          }
          className="ml-auto mr-3 text-gray-600 hover:text-[#0077B6] transition"
        >
          <FiRefreshCcw size={22} />
        </button>

        {/* ⬇ Icône pour fermer */}
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-[#0077B6] transition"
        >
          <FiChevronsDown size={22} />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-80 overflow-y-auto space-y-2 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            } 
                      ${index === 0 ? "bg-gray-100" : ""}`} // ✅ Gris plus clair pour le premier message
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Zone de saisie du message */}
      <div className="p-3 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="w-full p-2 border border-gray-200 rounded-lg shadow-inner bg-gray-100"
          placeholder="Écrivez un message..."
        />
      </div>
    </motion.div>
  );
};

export default ChatWindow;
