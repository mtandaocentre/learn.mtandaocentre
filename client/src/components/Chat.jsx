import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { motion as Motion, AnimatePresence } from "framer-motion"; // Changed here

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("general");
  const rooms = ["general", "javascript", "react", "node"];
  const { user } = useAuth();
  const socketRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    socketRef.current = io(
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    );

    socketRef.current.emit("joinRoom", room);
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.emit("leaveRoom", room);
      socketRef.current.disconnect();
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    socketRef.current.emit("chatMessage", {
      room,
      message,
      user: {
        id: user._id,
        username: user.username,
      },
    });
    setMessage("");
  };

  const handleRoomChange = (e) => {
    const newRoom = e.target.value;
    socketRef.current.emit("leaveRoom", room);
    setRoom(newRoom);
    socketRef.current.emit("joinRoom", newRoom);
    setMessages([]);
  };

  // Message animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-primary-darker rounded-lg shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Chat Room</h3>
        <select
          value={room}
          onChange={handleRoomChange}
          className="bg-primary-dark text-text-light px-2 py-1 rounded"
        >
          {rooms.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <Motion.div
              key={i}
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ duration: 0.2 }}
              className={`flex ${
                msg.user.id === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.user.id === user?._id
                    ? "bg-accent text-white"
                    : "bg-primary-dark"
                }`}
              >
                <div className="font-semibold">{msg.user.username}</div>
                <div>{msg.text}</div>
                <div className="text-xs opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {user ? (
        <Motion.form
          onSubmit={handleSubmit}
          className="flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-primary-dark text-text-light px-4 py-2 rounded-l-md focus:outline-none"
          />
          <Motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
          >
            Send
          </Motion.button>
        </Motion.form>
      ) : (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          Please login to participate in the chat
        </Motion.div>
      )}
    </div>
  );
};

export default Chat;
