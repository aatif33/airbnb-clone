import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import PageWrapper from "../components/common/PageWrapper";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const service = services.find((s) => s.id === id);

  const [hours, setHours] = useState(1);

  /* PAYMENT STATES */
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!service) {
    return <PageWrapper>Service not found</PageWrapper>;
  }

  const total = service.price * hours;

  /* 🔥 SAVE BOOKING AFTER MOCK PAYMENT */
  const handlePayment = async () => {
    if (!user) return alert("Please login");
    if (!paymentMethod) return;

    setPaying(true);

    // ⏳ simulate payment delay
    setTimeout(async () => {
      try {
        await addDoc(
          collection(db, "users", user.uid, "serviceBookings"),
          {
            serviceId: service.id,
            title: service.title,
            hours,
            price: total,
            paymentMethod,
            createdAt: serverTimestamp(),
          }
        );

        setShowPayment(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        alert("Payment failed");
        console.error(err);
      }

      setPaying(false);
    }, 2000);
  };

  return (
    <PageWrapper>
      <section className="max-w-4xl mx-auto px-6 py-10 pb-32">

        <Link to="/services" className="text-sm text-gray-500">
          ← Back
        </Link>

        <h1 className="text-3xl font-semibold mt-4">
          {service.title}
        </h1>

        <img
          src={service.image}
          className="w-full h-[380px] object-cover rounded-2xl my-8"
          alt={service.title}
        />

        <p className="text-gray-600 mb-6">
          {service.description}
        </p>

        {/* HOURS */}
        <h2 className="text-xl font-semibold mb-3">
          Duration
        </h2>

        <div className="flex items-center gap-6 mb-24">
          <button
            onClick={() => setHours(Math.max(1, hours - 1))}
            className="w-8 h-8 border rounded-full"
          >
            −
          </button>

          <span>{hours} hour(s)</span>

          <button
            onClick={() => setHours(hours + 1)}
            className="w-8 h-8 border rounded-full"
          >
            +
          </button>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl">
            🎉 Service booked successfully!
          </div>
        )}

        {/* BOOK BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between">
            <div>
              From ₹{total}
              <p className="text-sm text-gray-500">
                Free cancellation
              </p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg"
            >
              Book
            </button>
          </div>
        </div>

        {/* PAYMENT MODAL */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl w-[360px] p-6 relative">

              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-4 right-4 text-gray-400"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold mb-1">
                Confirm & Pay
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Secure payment · Mock flow
              </p>

              {/* PAYMENT OPTIONS */}
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe" },
                  { id: "card", label: "Card", desc: "Credit / Debit card" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`w-full border rounded-xl p-4 text-left
                      ${
                        paymentMethod === m.id
                          ? "border-rose-500 bg-rose-50"
                          : ""
                      }`}
                  >
                    <p className="font-medium">{m.label}</p>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-5 text-sm">
                <span>Total</span>
                <span className="font-semibold">₹{total}</span>
              </div>

              <button
                disabled={!paymentMethod || paying}
                onClick={handlePayment}
                className={`w-full mt-4 py-3 rounded-xl
                  ${
                    paymentMethod
                      ? "bg-rose-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }
                  ${paying ? "animate-pulse" : ""}
                `}
              >
                {paying ? "Processing…" : "Proceed to Pay"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                🔒 Mock payment
              </p>
            </div>
          </div>
        )}

      </section>
    </PageWrapper>
  );
}