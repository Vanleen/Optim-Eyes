import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { motion } from "framer-motion";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-20 right-6 flex items-center cursor-pointer shadow-lg rounded-full overflow-hidden"
        initial={{ width: "4rem" }}
        animate={{ width: hovered ? "20rem" : "4rem" }} // ✅ Plus large pour éviter le retour à la ligne
        transition={{ type: "spring", stiffness: 120, damping: 15 }} // ✅ Animation plus douce
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: "4rem",
          backgroundColor: hovered ? "white" : "#0077B6",
          border: "1px solid #ccc",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          borderRadius: "50px",
        }}
      >
        {/* Orbe animée avec particules */}
        <motion.div
          className="w-16 h-16 bg-black rounded-full flex items-center justify-center relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{
            border: "3px solid white",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {/* Particules oranges et bleues */}
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={`orange-${i}`}
              className="absolute w-2 h-2 bg-[#ffaf50] rounded-full"
              animate={{
                x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              }}
              transition={{ repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut" }}
            />
          ))}
          {[...Array(5)].map((_, i) => ( // ✅ Ajout d'une particule bleue en plus
            <motion.span
              key={`blue-${i}`}
              className="absolute w-2 h-2 bg-[#0077B6] rounded-full"
              animate={{
                x: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
              }}
              transition={{ repeat: Infinity, duration: 2.5 + Math.random(), ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* Texte qui apparaît au survol */}
        {hovered && (
          <motion.span
            className="ml-3 text-gray-800 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }} // ✅ Animation plus fluide
          >
            Comment puis-je vous aider ?
          </motion.span>
        )}
      </motion.div>

      {/* Fenêtre du chatbot */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
