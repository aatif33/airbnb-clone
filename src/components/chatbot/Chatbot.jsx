import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("menu"); // menu | support
  const [typing, setTyping] = useState(false);

  const navigate = useNavigate();

  const resetBot = () => {
    setMessages([]);
    setInput("");
    setMode("menu");
    setTyping(false);
  };

  const closeBot = () => {
    setOpen(false);
    resetBot();
  };

  const addUser = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const addBot = (text, delay = 800) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text }]);
      setTyping(false);
    }, delay);
  };

  const handleMenu = (option) => {
    addUser(option);

    switch (option) {
      case "Explore services":
        addBot("Sure! Taking you to services 🧰");
        setTimeout(() => {
          closeBot();
          navigate("/services");
        }, 1200);
        break;

      case "My bookings":
        addBot(
          "You can view all your trips and experiences in the Trips section 🧳"
        );
        break;

      case "Cancellation policy":
        addBot(
          "Most experiences offer free cancellation up to 24–72 hours before the start time. You’ll see the exact policy on the booking page."
        );
        break;

      case "Talk to support":
        addBot(
          "Sure 🙂 Please describe your issue in detail and I’ll help you."
        );
        setMode("support");
        break;

      default:
        addBot("I didn’t understand that. Please choose an option.");
    }
  };

  const handleSupportSend = () => {
    if (!input.trim()) return;

    addUser(input);
    setInput("");

    addBot(
      "Thanks for reaching out! A support agent will review this and get back to you soon."
    );

    setMode("menu");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-14 right-6 bg-rose-500 text-white rounded-full p-4 shadow-lg z-50 hover:scale-110 transition"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-rose-500 text-white p-4 rounded-t-xl flex justify-between items-center">
            <span>Airbnb Assistant</span>
            <button onClick={closeBot} className="text-lg">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto text-sm">
            {messages.length === 0 && (
              <p className="text-gray-500">
                Hi 👋 How can I help you today?
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-xs">
                    🤖
                  </div>
                )}

                <div
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-rose-100"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
                  🤖
                </div>
                Assistant is typing…
              </div>
            )}

            {/* MENU */}
            {mode === "menu" && !typing && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[
                  "Explore services",
                  "My bookings",
                  "Cancellation policy",
                  "Talk to support",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleMenu(item)}
                    className="border rounded-lg p-2 hover:bg-gray-100 text-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SUPPORT INPUT */}
          {mode === "support" && (
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={handleSupportSend}
                className="bg-rose-500 text-white px-3 rounded-lg"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}