import { useParams, Link } from "react-router-dom";
import { experiences } from "../data/experiences";
import PageWrapper from "../components/common/PageWrapper";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  runTransaction,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function ExperienceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const all = [...experiences.originals, ...experiences.local];
  const experience = all.find((e) => String(e.id) === id);

  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guests, setGuests] = useState(1);

  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  /* PAYMENT STATES */
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paying, setPaying] = useState(false);

  const [success, setSuccess] = useState(false);

  if (!experience) {
    return <PageWrapper>Experience not found</PageWrapper>;
  }

  /* LOAD DATES */
  useEffect(() => {
    const loadDates = async () => {
      setLoadingDates(true);
      const ref = collection(db, "experiences", id, "availability");
      const snap = await getDocs(ref);
      setDates(snap.docs.map((d) => d.id));
      setLoadingDates(false);
    };
    loadDates();
  }, [id]);

  /* LOAD SLOTS */
  useEffect(() => {
    if (!selectedDate) return;

    const loadSlots = async () => {
      setLoadingSlots(true);
      const ref = collection(
        db,
        "experiences",
        id,
        "availability",
        selectedDate,
        "slots"
      );
      const snap = await getDocs(ref);
      setSlots(snap.docs.map((d) => ({ time: d.id, ...d.data() })));
      setLoadingSlots(false);
    };

    loadSlots();
  }, [id, selectedDate]);

  const selectedSlotData = slots.find((s) => s.time === selectedSlot);
  const maxGuests = selectedSlotData?.capacity || 1;
  const totalPrice = experience.price * guests;

  /* 🔥 FINAL BOOK AFTER PAYMENT */
  const confirmPaymentAndBook = async () => {
    if (!user) return alert("Please login");
    if (!selectedSlotData) return;

    setPaying(true);

    const slotRef = doc(
      db,
      "experiences",
      id,
      "availability",
      selectedDate,
      "slots",
      selectedSlot
    );

    const bookingRef = doc(
      collection(db, "users", user.uid, "experienceBookings")
    );

    try {
      await runTransaction(db, async (transaction) => {
        const slotSnap = await transaction.get(slotRef);
        if (!slotSnap.exists()) throw new Error("Slot not found");

        const data = slotSnap.data();

        if (data.capacity < guests) {
          throw new Error("Not enough spots available");
        }

        transaction.update(slotRef, {
          capacity: data.capacity - guests,
        });

        transaction.set(bookingRef, {
          experienceId: experience.id,
          title: experience.title,
          location: experience.location,
          date: selectedDate,
          time: selectedSlot,
          guests,
          price: totalPrice,
          paymentMethod,
          createdAt: serverTimestamp(),
        });
      });
      setShowPayment(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    }
   navigate(`/experience-receipt/${bookingRef.id}`);
    setPaying(false);
  };

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10 pb-40">
        <Link to="/experiences" className="text-sm text-gray-500">
          ← Back
        </Link>

        <h1 className="text-3xl font-semibold mt-4">{experience.title}</h1>
        <p className="text-gray-600">{experience.location}</p>

        <img
          src={experience.image}
          className="w-full h-[420px] object-cover rounded-2xl my-8"
        />

        {/* DATES */}
        <h2 className="text-xl font-semibold mb-3">Select a date</h2>

        {loadingDates ? (
          <p>Loading dates…</p>
        ) : (
          <div className="flex gap-3 flex-wrap mb-8">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                  setGuests(1);
                }}
                className={`px-4 py-2 rounded-full border ${
                  selectedDate === date ? "bg-black text-white" : ""
                }`}
              >
                {new Date(date).toDateString()}
              </button>
            ))}
          </div>
        )}

        {/* SLOTS */}
        {selectedDate && (
          <>
            <h2 className="text-xl font-semibold mb-3">Choose a time</h2>

            {loadingSlots ? (
              <p>Loading slots…</p>
            ) : (
              <div className="flex gap-3 flex-wrap mb-8">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={slot.capacity === 0}
                    onClick={() => {
                      setSelectedSlot(slot.time);
                      setGuests(1);
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSlot === slot.time
                        ? "bg-black text-white"
                        : ""
                    } ${slot.capacity === 0 ? "opacity-40" : ""}`}
                  >
                    {slot.time} · {slot.capacity} spots
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* GUESTS */}
        {selectedSlotData && (
          <>
            <h2 className="text-xl font-semibold mb-3">Guests</h2>
            <div className="flex items-center gap-6 mb-20">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 border rounded-full"
              >
                −
              </button>

              <span>{guests}</span>

              <button
                onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                className="w-8 h-8 border rounded-full"
              >
                +
              </button>

              <span className="text-sm text-gray-500">
                Max {maxGuests}
              </span>
            </div>
          </>
        )}

        {success && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl">
            🎉 Payment successful! Experience booked.
          </div>
        )}

        {/* BOOK BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
            <div>
              From ₹{totalPrice} / {guests} guest
              <p className="text-sm text-gray-500">Free cancellation</p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              disabled={!selectedSlotData}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg"
            >
              Book
            </button>
          </div>
        </div>

        {showPayment && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl w-[360px] p-6 relative animate-scaleIn">

      {/* CLOSE */}
      <button
        onClick={() => setShowPayment(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-black"
      >
        ✕
      </button>

      <h3 className="text-xl font-semibold mb-1">
        Confirm & Pay
      </h3>
      <p className="text-sm text-gray-500 mb-5">
        Secure payment · Free cancellation
      </p>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-3">
        {[
          { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
          { id: "card", label: "Card", desc: "Credit / Debit card" }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setPaymentMethod(m.id)}
            className={`w-full border rounded-xl p-4 text-left transition
              ${
                paymentMethod === m.id
                  ? "border-rose-500 bg-rose-50"
                  : "hover:border-gray-400"
              }`}
          >
            <p className="font-medium">{m.label}</p>
            <p className="text-sm text-gray-500">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="flex justify-between items-center mt-5 text-sm">
        <span>Total</span>
        <span className="font-semibold">₹{totalPrice}</span>
      </div>

      {/* PAY BUTTON */}
      <button
        disabled={!paymentMethod || paying}
        onClick={confirmPaymentAndBook}
        className={`w-full mt-4 py-3 rounded-xl font-medium transition
          ${
            paymentMethod
              ? "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
              : "bg-gray-300 text-gray-500"
          }
          ${paying ? "animate-pulse cursor-not-allowed" : ""}
        `}
      >
        {paying ? "Processing payment…" : "Proceed to Pay"}
      </button>

      {/* SECURITY NOTE */}
      <p className="text-xs text-gray-400 text-center mt-3">
        🔒 Payments are securely processed
      </p>
    </div>
  </div>
)}
      </section>
    </PageWrapper>
  );
}