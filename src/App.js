import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const URL = "https://socket-green.vercel.app";

const SocketComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io(URL, {
      transports: ["websocket", "polling"], // Allow both transports
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the server", socket.id);
    });

    socket.on("received", (data) => {
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io(URL, {
      transports: ["websocket", "polling"], // Allow both transports
      withCredentials: true,
    });
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default SocketComponent;
