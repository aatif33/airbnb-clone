import { useParams, Link } from "react-router-dom";
import { listings } from "../data/listings";
import { useState, useEffect } from "react";
import PageWrapper from "../components/common/PageWrapper";
import MobileBookingSheet from "../components/booking/MobileBookingSheet";

export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
 const resetBookingFlow = () => {
  setCheckIn("");
  setCheckOut("");
  setGuests(1);
  setPaymentMethod("");
  setPaymentDone(false);
  setShowPayment(false);
};

  if (!listing) {
    return (
      <div className="p-10">
        <p>Listing not found</p>
        <Link to="/" className="text-rose-500 underline">Go back</Link>
      </div>
    );
  }

  /* PRICE */
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * listing.price;

  /* SUCCESS TOAST */
useEffect(() => {
  if (paymentDone) {
    setShowSuccess(true);

    const t = setTimeout(() => {
      setShowSuccess(false);
      resetBookingFlow(); // 👈 THIS IS THE KEY
    }, 3000);

    return () => clearTimeout(t);
  }
}, [paymentDone]);


  /* AUTO SCROLL TO PAYMENT */
  const goToPayment = () => {
    setShowPayment(true);
    setTimeout(() => {
      document
        .getElementById("payment-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <PageWrapper>
      <section className="max-w-6xl mx-auto px-6 py-10 pb-36">
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
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border rounded-lg p-2"
              />
              <input
                type="date"
                value={checkOut}
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

            {!paymentDone && (
              <button
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    alert("Select dates");
                    return;
                  }
                  goToPayment();
                }}
                className="w-full bg-rose-500 text-white py-3 rounded-lg"
              >
                Reserve
              </button>
            )}
          </div>
        </div>

        {/* PAYMENT (SHARED) */}
        {showPayment && !paymentDone && (
          <div
            id="payment-section"
            className="max-w-md mx-auto mt-8 border rounded-xl p-6 bg-white shadow"
          >
            <h4 className="font-semibold mb-4">Payment Method</h4>

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
              disabled={!paymentMethod}
              onClick={() => {
                const booking = {
                  id: Date.now(),
                  title: listing.title,
                  location: listing.location,
                  checkIn,
                  checkOut,
                  guests,
                  nights,
                  totalPrice,
                  paymentMethod,
                  bookedAt: new Date().toISOString(),
                };

                const existing =
                  JSON.parse(localStorage.getItem("bookings")) || [];

                localStorage.setItem(
                  "bookings",
                  JSON.stringify([...existing, booking])
                );

                setPaymentDone(true);
                setShowPayment(false);
              }}
              className={`mt-4 w-full py-3 rounded-lg font-medium ${
                paymentMethod
                  ? "bg-rose-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Pay ₹{totalPrice || listing.price}
            </button>
          </div>
        )}

        {showSuccess && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
            🎉 Booking successful!
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
      <MobileBookingSheet
        open={showMobileBooking}
        onClose={() => setShowMobileBooking(false)}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        setGuests={setGuests}
        onContinue={() => {
          if (!checkIn || !checkOut) {
            alert("Select dates");
            return;
          }
          setShowMobileBooking(false);
          goToPayment();
        }}
/>

    </PageWrapper>
  );
}
