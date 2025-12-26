import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ExperienceReceipt() {
  const { id } = useParams(); // bookingId
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;

    const loadReceipt = async () => {
      try {
        const ref = doc(
          db,
          "users",
          user.uid,
          "experienceBookings",
          id
        );

        const snap = await getDoc(ref);

        if (!snap.exists()) {
          throw new Error("Booking not found");
        }

        setBooking(snap.data());
      } catch (err) {
        console.error(err);
        alert("Unable to load receipt");
      } finally {
        setLoading(false);
      }
    };

    loadReceipt();
  }, [user, id]);

  if (loading) {
    return (
      <PageWrapper>
        <p className="text-center py-20 text-gray-500">
          Loading receipt…
        </p>
      </PageWrapper>
    );
  }

  if (!booking) {
    return (
      <PageWrapper>
        <p className="text-center py-20 text-gray-500">
          Receipt not found
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-3xl font-semibold mb-2">
          Booking Confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Your experience has been successfully booked.
        </p>

        <div className="border rounded-xl p-5 text-left space-y-2 mb-8">
          <p><strong>Experience:</strong> {booking.title}</p>
          <p><strong>Location:</strong> {booking.location}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(booking.date).toDateString()}
          </p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
          <p><strong>Payment:</strong> {booking.paymentMethod}</p>
          <p className="font-semibold pt-2">
            Total Paid: ₹{booking.price}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/experience-bookings"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            View bookings
          </Link>

          <Link
            to="/experiences"
            className="border px-6 py-3 rounded-lg"
          >
            Browse more
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
