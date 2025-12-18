import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { listings } from "../data/listings";

export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

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
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Check-out</label>
              <input
                type="date"
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

         <button className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 active:scale-95 transition-all">
         Reserve
         </button>

        </div>
      </div>
    </section>
  );
}
