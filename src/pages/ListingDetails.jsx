import { useParams, Link, useNavigate } from "react-router-dom";
import { listings } from "../data/listings";
import { useState, useEffect } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const listing = listings.find(l => l.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [showPayment, setShowPayment] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!listing) {
    return <PageWrapper>Listing not found</PageWrapper>;
  }

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * listing.price;

  /* 🔥 FINAL BOOKING LOGIC */
  const handleFinalBooking = async () => {
    if (!user) return alert("Please login");
    if (!paymentMethod) return alert("Select payment method");

    try {
      setProcessing(true);

      const docRef = await addDoc(
        collection(db, "users", user.uid, "bookings"),
        {
          listingId: listing.id,
          title: listing.title,
          location: listing.location,
          checkIn,
          checkOut,
          guests,
          nights,
          totalPrice,
          paymentMethod,
          createdAt: serverTimestamp(),
        }
      );

      setProcessing(false);
      setShowPayment(false);
      setShowMobileBooking(false);
      setSuccess(true);

      setTimeout(() => {
        navigate(`/booking-receipt/${docRef.id}`);
      }, 1200);

    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setProcessing(false);
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-6xl mx-auto px-6 py-10 pb-32">
        <Link to="/" className="text-sm text-gray-500">← Back</Link>

        <h1 className="text-3xl font-semibold mt-3">{listing.title}</h1>
        <p className="text-gray-600">
          ⭐ {listing.rating} · {listing.reviews} · {listing.location}
        </p>

        <img
          src={listing.image}
          className="w-full h-[420px] object-cover rounded-xl my-6"
        />

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">
              Hosted by {listing.host}
            </h2>
            <p className="text-gray-600">
              Comfortable stay with great amenities.
            </p>
          </div>

          {/* DESKTOP BOOKING */}
          <div className="hidden md:block border rounded-xl p-6">
            <p className="text-xl font-semibold mb-4">
              ₹{listing.price} / night
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-2 rounded-lg"/>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-2 rounded-lg"/>
            </div>

            <div className="flex justify-between border rounded-lg p-2 mb-4">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>

            <button
              onClick={() => {
                if (!checkIn || !checkOut) return alert("Select dates");
                setShowPayment(true);
              }}
              className="bg-rose-500 text-white w-full py-3 rounded-lg"
            >
              Reserve
            </button>
          </div>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl">
            🎉 Booking confirmed!
          </div>
        )}
      </section>

      {/* MOBILE BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between">
        <span>₹{listing.price} / night</span>
        <button
          onClick={() => setShowMobileBooking(true)}
          className="bg-rose-500 text-white px-6 py-2 rounded-lg"
        >
          Reserve
        </button>
      </div>

      {/* MOBILE BOOKING MODAL */}
      {showMobileBooking && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Your trip</h3>
              <button onClick={() => setShowMobileBooking(false)}>✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-2 rounded-lg"/>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-2 rounded-lg"/>
            </div>

            <div className="flex justify-between border rounded-lg p-2 mb-4">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="bg-rose-500 text-white w-full py-3 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* 🔥 NEW PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[360px] rounded-2xl p-6 relative">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-1">Confirm & Pay</h3>
            <p className="text-sm text-gray-500 mb-4">
              Secure payment · Free cancellation
            </p>

            {[
              { id: "upi", label: "UPI" },
              { id: "card", label: "Card" },
              { id: "netbanking", label: "Net Banking" },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPaymentMethod(p.id)}
                className={`w-full border rounded-xl p-4 mb-2 text-left ${
                  paymentMethod === p.id
                    ? "border-rose-500 bg-rose-50"
                    : ""
                }`}
              >
                {p.label}
              </button>
            ))}

            <div className="flex justify-between text-sm mt-4">
              <span>Total</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>

            <button
              onClick={handleFinalBooking}
              disabled={!paymentMethod || processing}
              className={`w-full mt-4 py-3 rounded-xl ${
                paymentMethod
                  ? "bg-rose-500 text-white"
                  : "bg-gray-300 text-gray-500"
              } ${processing ? "animate-pulse" : ""}`}
            >
              {processing ? "Processing…" : "Proceed to Pay"}
            </button>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}