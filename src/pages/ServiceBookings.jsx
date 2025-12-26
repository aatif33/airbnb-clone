import { useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ServiceBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 LIVE LISTENER FOR SERVICE BOOKINGS */
  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const ref = collection(
      db,
      "users",
      user.uid,
      "serviceBookings" // ✅ CORRECT PATH
    );

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setBookings(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  /* ❌ CANCEL SERVICE BOOKING */
  const cancelBooking = async (bookingId) => {
    const ok = window.confirm("Cancel this service booking?");
    if (!ok) return;

    try {
      await deleteDoc(
        doc(
          db,
          "users",
          user.uid,
          "serviceBookings",
          bookingId
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            Your services
          </h1>

          <Link
            to="/services"
            className="text-sm text-rose-500 hover:underline"
          >
            Browse services →
          </Link>
        </div>

        {!user ? (
          <p className="text-gray-500">
            Please log in to view your service bookings
          </p>
        ) : loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">
            You haven’t booked any services yet 🛠️
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border rounded-xl p-5 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {b.title}
                  </h3>

                  {b.hours && (
                    <p className="text-sm text-gray-500">
                      {b.hours} hour(s)
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-1">
                    Paid via {b.paymentMethod?.toUpperCase()}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <p className="font-semibold">
                    ₹{b.price}
                  </p>

                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
