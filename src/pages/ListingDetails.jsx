import { useParams, Link } from "react-router-dom";
import { listings } from "../data/listings";
import { useState, useEffect } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === Number(id));
  const { user } = useAuth();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [showPayment, setShowPayment] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [success, setSuccess] = useState(false);

  if (!listing) {
    return (
      <div className="p-10">
        <p>Listing not found</p>
        <Link to="/" className="text-rose-500 underline">Go back</Link>
      </div>
    );
  }

  /* PRICE CALC */
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * listing.price;

  /* AUTO HIDE SUCCESS */
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  /* BOOKING → FIRESTORE */
  const confirmBooking = async () => {
    if (!user) {
      alert("Please login to book");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }

    await addDoc(
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

    setSuccess(true);
    setShowPayment(false);
    setShowMobileBooking(false);
    setPaymentMethod("");
  };

  return (
    <PageWrapper>
      <section className="max-w-6xl mx-auto px-6 py-10 pb-32">
        <Link to="/" className="text-sm text-gray-500 mb-4 inline-block">
          ← Back
        </Link>

        <h1 className="text-3xl font-semibold mb-2">{listing.title}</h1>
        <p className="text-gray-600 mb-4">
          ⭐ {listing.rating} · {listing.reviews} reviews · {listing.location}
        </p>

        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-[420px] object-cover rounded-xl mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">
              Hosted by {listing.host}
            </h2>

            <p className="text-gray-600 mb-6">
              Enjoy a comfortable stay with modern amenities and a great
              location.
            </p>

            <h3 className="text-lg font-semibold mb-3">
              What this place offers
            </h3>

            <ul className="grid grid-cols-2 gap-3 text-gray-700">
              {listing.amenities.map((a) => (
                <li key={a}>✔ {a}</li>
              ))}
            </ul>
          </div>

          {/* DESKTOP BOOKING */}
          <div className="hidden md:block border rounded-xl p-6 shadow-sm">
            <p className="text-xl font-semibold mb-4">
              ₹{listing.price} <span className="text-gray-500">/ night</span>
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <input type="date" value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border rounded-lg p-2"
              />
              <input type="date" value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between border rounded-lg p-2 mb-4">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>

            {nights > 0 && (
              <p className="text-sm mb-3">
                {nights} nights × ₹{listing.price} = <b>₹{totalPrice}</b>
              </p>
            )}

            {!showPayment && (
              <button
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    alert("Select dates");
                    return;
                  }
                  setShowPayment(true);
                }}
                className="bg-rose-500 text-white py-3 rounded-lg font-medium
             active:scale-95 transition-transform"
              >
                Reserve
              </button>
            )}

            {showPayment && (
              <div className="mt-4 border p-4 rounded-lg">
                {["card", "upi", "netbanking"].map((m) => (
                  <label key={m} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {m.toUpperCase()}
                  </label>
                ))}

                <button
                  onClick={confirmBooking}
                  disabled={!paymentMethod}
                  className="mt-3 w-full bg-rose-500 text-white py-3 rounded-lg"
                >
                  Pay & Book
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUCCESS TOAST */}
        {success && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
            🎉 Booking confirmed!
          </div>
        )}
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t px-4 py-3 flex justify-between">
        <div>
          ₹{listing.price} <span className="text-sm text-gray-500">/ night</span>
        </div>

        <button
          onClick={() => setShowMobileBooking(true)}
          className="bg-rose-500 text-white px-6 py-2 rounded-lg"
        >
          Reserve
        </button>
      </div>

      {/* MOBILE MODAL */}
      {showMobileBooking && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Your trip</h3>
              <button onClick={() => setShowMobileBooking(false)}>✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <input type="date" value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border rounded-lg p-2"
              />
              <input type="date" value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between border rounded-lg p-2 mb-4">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>

            {!showPayment ? (
              <button
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    alert("Select dates");
                    return;
                  }
                  setShowPayment(true);
                }}
                className="bg-rose-500 text-white py-3 rounded-lg font-medium
             active:scale-95 transition-transform"
              >
                Continue
              </button>
            ) : (
              <>
                {["card", "upi", "netbanking"].map((m) => (
                  <label key={m} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {m.toUpperCase()}
                  </label>
                ))}

                <button
                  onClick={confirmBooking}
                  disabled={!paymentMethod}
                  className="w-full bg-rose-500 text-white py-3 rounded-lg"
                >
                  Pay & Book
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
