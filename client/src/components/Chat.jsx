import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("general");
  const rooms = ["general", "javascript", "react", "node"];
  const { user } = useAuth();
  const socketRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io(
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    );

    // Join room on component mount
    socketRef.current.emit("joinRoom", room);

    // Listen for messages
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up on unmount
    return () => {
      socketRef.current.emit("leaveRoom", room);
      socketRef.current.disconnect();
    };
  }, [room]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    // Send message to server
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

  return (
    <div className="bg-primary-darker rounded-lg shadow-lg p-4 h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Chat Room</h3>
        <select
          value={room}
          onChange={(e) => {
            socketRef.current.emit("leaveRoom", room);
            setRoom(e.target.value);
            socketRef.current.emit("joinRoom", e.target.value);
            setMessages([]);
          }}
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
        {messages.map((msg, i) => (
          <div
            key={i}
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
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-primary-dark text-text-light px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </form>
      ) : (
        <div className="text-center py-4">
          Please login to participate in the chat
        </div>
      )}
    </div>
  );
};

export default Chat;
