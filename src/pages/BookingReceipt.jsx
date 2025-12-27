import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BookingReceipt() {
  const { id } = useParams(); // booking id
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadBooking = async () => {
      const ref = doc(db, "users", user.uid, "bookings", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setBooking(snap.data());
      }
      setLoading(false);
    };

    loadBooking();
  }, [id, user]);

  if (loading) {
    return (
      <PageWrapper>
        <p className="p-10">Loading receipt…</p>
      </PageWrapper>
    );
  }

  if (!booking) {
    return (
      <PageWrapper>
        <p className="p-10">Booking not found</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="border rounded-2xl p-8 shadow-sm bg-white">
          <h1 className="text-3xl font-semibold mb-2">
            🎉 Booking Confirmed
          </h1>
          <p className="text-gray-500 mb-6">
            Thank you for booking with Airbnb
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">{booking.title}</p>
              <p className="text-gray-500">{booking.location}</p>
            </div>

            <div className="flex justify-between">
              <span>Check-in</span>
              <span>{booking.checkIn}</span>
            </div>

            <div className="flex justify-between">
              <span>Check-out</span>
              <span>{booking.checkOut}</span>
            </div>

            <div className="flex justify-between">
              <span>Guests</span>
              <span>{booking.guests}</span>
            </div>

            <div className="flex justify-between">
              <span>Nights</span>
              <span>{booking.nights}</span>
            </div>

            <div className="flex justify-between">
              <span>Payment method</span>
              <span className="uppercase">{booking.paymentMethod}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total paid</span>
              <span>₹{booking.totalPrice}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/bookings"
              className="px-5 py-2 rounded-lg border"
            >
              View trips
            </Link>

            <Link
              to="/"
              className="px-5 py-2 rounded-lg bg-rose-500 text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}