import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("start");
  const [type, setType] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const handleStart = (selectedType) => {
    setType(selectedType);
    addUserMessage(selectedType);
    addBotMessage("Please describe your message.");
    setStep("message");
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    addUserMessage(input);
    addBotMessage("✅ Thank you! Your message has been received.");
    console.log({ type, message: input }); // backend / AI ready
    setInput("");
    setStep("done");
  };

  const handleReset = () => {
    setMessages([]);
    setType("");
    setStep("start");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-14 right-6 bg-rose-500 text-white rounded-full p-4 shadow-lg z-50 hover:scale-110 transition"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border z-50 animate-fade-in flex flex-col">
          {/* Header */}
          <div className="bg-rose-500 text-white p-4 rounded-t-xl flex justify-between items-center">
            <span>Airbnb Assistant</span>
            <button onClick={handleReset} className="text-sm underline">
              Reset
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto text-sm">
            {messages.length === 0 && (
              <p className="text-gray-500">
                Hi 👋 How can I help you today?
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-rose-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {step === "start" && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Feedback", "Issue", "Feature", "Question"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleStart(item)}
                    className="border rounded-lg p-2 hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          {step === "message" && (
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={handleSubmit}
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
