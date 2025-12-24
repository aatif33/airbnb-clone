import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    // 🔥 LIVE listener
    const ref = collection(db, "users", user.uid, "bookings");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));
      setBookings(data);
    });

    return () => unsub();
  }, [user]);

  const cancelBooking = async (bookingId) => {
    const ok = confirm("Cancel this booking?");
    if (!ok) return;

    await deleteDoc(
      doc(db, "users", user.uid, "bookings", bookingId)
    );
  };

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Your trips</h1>

        {!user ? (
          <p className="text-gray-500">
            Please log in to view your trips 🧳
          </p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">
            You don’t have any trips yet 🧳
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.location}</p>

                  <p className="text-sm mt-1">
                    {b.checkIn} → {b.checkOut} · {b.guests} guest(s)
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Paid via {b.paymentMethod?.toUpperCase()}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <p className="font-semibold">₹{b.totalPrice}</p>
                  <p className="text-xs text-gray-400">
                    {b.nights} nights
                  </p>

                  {/* 🔥 CANCEL BUTTON */}
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
