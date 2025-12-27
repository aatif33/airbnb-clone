import { useState } from "react";
import { motion } from "framer-motion";

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
  nights = 1,
}) {
  const [method, setMethod] = useState("");
  const [paying, setPaying] = useState(false);

  if (!open) return null;

  const total = amount * nights + 500;

  const handlePay = () => {
    if (!method) return;

    setPaying(true);

    // ⏳ Mock payment delay
    setTimeout(() => {
      setPaying(false);
      onSuccess(method); // 🔥 booking happens here
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-[380px] p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Confirm & Pay</h3>
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>

        {/* Price */}
        <div className="space-y-2 text-sm mb-5">
          <div className="flex justify-between">
            <span>₹{amount} × {nights} night</span>
            <span>₹{amount * nights}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>₹500</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Payment methods */}
        <div className="space-y-3">
          {[
            { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm" },
            { id: "card", label: "Card", desc: "Credit / Debit card" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full border rounded-xl p-4 text-left transition
                ${method === m.id
                  ? "border-rose-500 bg-rose-50"
                  : "hover:border-gray-400"}`}
            >
              <p className="font-medium">{m.label}</p>
              <p className="text-sm text-gray-500">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Pay */}
        <button
          onClick={handlePay}
          disabled={!method || paying}
          className={`w-full mt-5 py-3 rounded-xl font-medium transition
            ${
              method
                ? "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
                : "bg-gray-300 text-gray-500"
            }
            ${paying ? "animate-pulse cursor-not-allowed" : ""}
          `}
        >
          {paying ? "Processing payment…" : "Proceed to Pay"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          🔒 Secure mock payment
        </p>
      </motion.div>
    </div>
  );
}