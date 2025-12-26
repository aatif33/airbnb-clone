import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const chatRef = useRef(null);
  const resetChatbot = () => {
  setOpen(false);
  setMessages([]);
  setInput("");
  setLoading(false);
  setShowScrollBtn(false);
};

  const add = (sender, text) =>
    setMessages((m) => [...m, { sender, text }]);

  /* 🔽 AUTO SCROLL ON NEW MESSAGE */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  /* 👀 SHOW SCROLL BUTTON WHEN USER SCROLLS UP */
  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;

    const isBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    setShowScrollBtn(!isBottom);
  };

  /* 🔍 SERVICES */
  const handleServices = async () => {
    const snap = await getDocs(collection(db, "services"));
    if (snap.empty) {
      add("bot", "❌ No services available right now.");
      return;
    }

    let msg = "🛠️ Available services:\n";
    snap.docs.forEach((d, i) => {
      const s = d.data();
      msg += `\n${i + 1}. ${s.title} – ₹${s.price}`;
    });

    add("bot", msg);
  };

  /* 📦 MY SERVICES */
  const handleMyServices = async () => {
    if (!user) {
      add("bot", "Please login to view your service bookings.");
      return;
    }

    const ref = collection(db, "users", user.uid, "serviceBookings");
    const snap = await getDocs(query(ref, orderBy("createdAt", "desc")));

    if (snap.empty) {
      add("bot", "You don’t have any service bookings yet.");
      return;
    }

    let msg = "📦 Your service bookings:\n";
    snap.docs.forEach((d, i) => {
      const b = d.data();
      msg += `\n${i + 1}. ${b.title} – ₹${b.price}`;
    });

    add("bot", msg);
  };

  /* 🤖 SEND */
  const sendMessage = async () => {
    if (!input.trim()) return;

    add("user", input);
    const text = input.toLowerCase();
    setInput("");
    setLoading(true);

    try {
      if (text.includes("service")) {
        text.includes("my")
          ? await handleMyServices()
          : await handleServices();
      } else {
        const res = await model.generateContent(input);
        add("bot", res.response.text());
      }
    } catch {
      add("bot", "❌ Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* FLOATING CHAT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-14 right-6 bg-rose-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border z-50 flex flex-col">

          {/* HEADER */}
          <div className="bg-rose-500 text-white p-4 rounded-t-xl flex justify-between items-center">
            <span>Airbnb Assistant</span>

            {/* ❌ EXIT BUTTON */}
            <button
              onClick={resetChatbot}
              className="text-white text-lg hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {/* CHAT */}
          <div
            ref={chatRef}
            onScroll={handleScroll}
            className="flex-1 p-3 overflow-y-auto text-sm space-y-2 relative"
          >
            {messages.length === 0 && (
              <p className="text-gray-500">
                Hi 👋 Ask me about services or bookings
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.sender === "user"
                    ? "bg-rose-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-400">Thinking…</p>
            )}

            {/* ⬇️ SCROLL TO BOTTOM */}
            {showScrollBtn && (
              <button
                onClick={() =>
                  chatRef.current.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="absolute bottom-3 right-3 bg-rose-500 text-white w-8 h-8 rounded-full shadow-md"
              >
                ⬇️
              </button>
            )}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Ask about services…"
            />
            <button
              onClick={sendMessage}
              className="bg-rose-500 text-white px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
