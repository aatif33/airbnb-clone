import { useParams, Link } from "react-router-dom";
import { listings } from "../data/listings";
import { useState, useEffect } from "react";
import PageWrapper from "../components/common/PageWrapper";
export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!listing) {
    return (
      <div className="p-10">
        <p>Listing not found</p>
        <Link to="/" className="text-rose-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  /* ---------- PRICE CALCULATION ---------- */
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * listing.price;

  /* ---------- SUCCESS AUTO-HIDE ---------- */
  useEffect(() => {
    if (paymentDone) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [paymentDone]);

  return (
    <PageWrapper>
    <section className="max-w-6xl mx-auto px-6 py-10">
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
        {/* LEFT CONTENT */}
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
            {listing.amenities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                ✔ <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOOKING CARD */}
        <div className="border rounded-xl p-6 shadow-sm h-fit">
          <p className="text-xl font-semibold mb-4">
            ₹{listing.price} <span className="text-gray-500">/ night</span>
          </p>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className="text-xs font-medium">Check-in</label>
              <input
                type="date"
                disabled={paymentDone}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Check-out</label>
              <input
                type="date"
                disabled={paymentDone}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="mb-4">
            <label className="text-xs font-medium">Guests</label>
            <div className="flex items-center justify-between border rounded-lg p-2 mt-1">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="px-3 text-lg hover:bg-gray-100 rounded-full"
              >
                −
              </button>
              <span>{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="px-3 text-lg hover:bg-gray-100 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {/* PRICE SUMMARY */}
          {nights > 0 && (
            <p className="text-sm text-gray-600 mb-3">
              {nights} nights × ₹{listing.price} ={" "}
              <b>₹{totalPrice}</b>
            </p>
          )}

          {/* RESERVE BUTTON */}
          {!showPayment && !paymentDone && (
            <button
              onClick={() => {
                if (!checkIn || !checkOut) {
                  alert("Please select dates");
                  return;
                }
                setShowPayment(true);
              }}
              className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600"
            >
              Reserve
            </button>
          )}

          {/* PAYMENT */}
          {showPayment && !paymentDone && (
            <div className="mt-6 border rounded-lg p-4 bg-white">
              <h4 className="font-semibold mb-3">Payment Method</h4>

              <div className="space-y-2 text-sm">
                {["card", "upi", "netbanking"].map((m) => (
                  <label key={m} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {m.toUpperCase()}
                  </label>
                ))}
              </div>

              <button
                disabled={!paymentMethod}
                onClick={() => {
                  setPaymentDone(true);
                  localStorage.setItem(
                    "latestBooking",
                    JSON.stringify({
                      title: listing.title,
                      checkIn,
                      checkOut,
                      guests,
                      nights,
                      totalPrice,
                      paymentMethod,
                    })
                  );
                }}
                className={`mt-4 w-full py-3 rounded-lg font-medium
                  ${
                    paymentMethod
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Pay Now
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {paymentDone && (
            <div className="mt-6 border rounded-lg p-4 bg-green-50 text-center">
              <h4 className="font-semibold text-green-700 mb-2">
                ✅ Booking Confirmed
              </h4>
              <p className="text-sm text-green-600">
                Payment via {paymentMethod.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed bottom-6 left-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
          🎉 Booking successful!
        </div>
      )}
    </section>
    </PageWrapper>
  );
}
