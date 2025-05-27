import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Chat from "./Chat";

const FloatingChat = () => {
  // Disable rendering completely
  return null;

  /* -- Keep this code commented for future use --
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatVariants = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: 50, scale: 0.8 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 15 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-accent text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
      >
        💬
      </Motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <Motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={chatVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-20 right-4 w-80 h-[600px] bg-transparent rounded-lg shadow-xl"
          >
            <Chat />
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  -- End of commented code -- */
};

export default FloatingChat;