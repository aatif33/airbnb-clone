import { useParams, Link } from "react-router-dom";
import { listings } from "../data/listings";
import { useState, useEffect } from "react";


export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [reserved, setReserved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
const [paymentDone, setPaymentDone] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("");
const calculateNights = () => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end - start;
  return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
};

const nights = calculateNights();
const totalPrice = nights * listing.price;

useEffect(() => {
  if (reserved) {
    setShowSuccess(true);

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [reserved]);


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

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-gray-500 mb-4 inline-block">
        ← Back
      </Link>

      <h1 className="text-3xl font-semibold mb-2">
        {listing.title}
      </h1>

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
            location. Perfect for couples, families, and solo travelers.
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
            ₹{listing.price}{" "}
            <span className="text-gray-500">/ night</span>
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
            className="px-3 text-lg hover:bg-gray-100 rounded-full transition">
            −
          </button>

              <span>{guests}</span>
             <button
            onClick={() => setGuests(guests + 1)}
            className="px-3 text-lg hover:bg-gray-100 rounded-full transition">
            +
          </button>

            </div>
          </div>
<button
 onClick={() => {
  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates");
    return;
  }
  setReserved(true);
  setShowPayment(true);
}}


  disabled={reserved}
  className={`w-full py-3 rounded-lg font-medium transition-all
    ${
      reserved
        ? "bg-green-500 text-white cursor-not-allowed"
        : "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
    }`}
>
  {reserved ? "Reserved ✔" : "Reserve"}
</button>
{nights > 0 && (
  <p className="text-sm text-gray-600 mb-3">
    {nights} nights × ₹{listing.price} ={" "}
    <b>₹{totalPrice}</b>
  </p>
)}

{showPayment && !paymentDone && (
  <div className="mt-6 border rounded-lg p-4 bg-white">
    <h4 className="font-semibold mb-3">Payment Method</h4>

    <div className="space-y-2 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        💳 Credit / Debit Card
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="upi"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        📱 UPI
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="netbanking"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        🏦 Net Banking
      </label>
    </div>

    <button
      disabled={!paymentMethod}
      onClick={() => {
  const booking = {
    listingId: listing.id,
    title: listing.title,
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
    paymentMethod,
    bookedAt: new Date().toISOString(),
  };

  localStorage.setItem("latestBooking", JSON.stringify(booking));
  setPaymentDone(true);
}}

      className={`mt-4 w-full py-3 rounded-lg font-medium transition
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
{paymentDone && (
  <div className="mt-6 border rounded-lg p-4 bg-green-50 text-center">
    <h4 className="font-semibold text-green-700 mb-2">
      ✅ Payment Successful
    </h4>
    <p className="text-sm text-green-600">
      Your booking has been confirmed.
    </p>
  </div>
)}
{paymentDone && (
  <div className="mt-6 border rounded-lg p-4 bg-gray-50">
    <h4 className="font-semibold mb-3">Booking Receipt</h4>

    <div className="text-sm text-gray-700 space-y-1">
      <p><b>Property:</b> {listing.title}</p>
      <p><b>Check-in:</b> {checkIn}</p>
      <p><b>Check-out:</b> {checkOut}</p>
      <p><b>Guests:</b> {guests}</p>
      <p><b>Nights:</b> {nights}</p>
      <p><b>Price per night:</b> ₹{listing.price}</p>

      <hr className="my-2" />

      <p className="font-semibold">
        Total Paid: ₹{totalPrice}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Payment Method: {paymentMethod.toUpperCase()}
      </p>
    </div>
  </div>
)}


{reserved && (
  <p className="text-green-600 text-sm mt-3 text-center">
    🎉 Your reservation was successful!
  </p>
)}

        </div>
      </div>
    </section>
  );
}
