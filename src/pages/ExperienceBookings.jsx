import { useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  runTransaction,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ExperienceBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 LIVE BOOKINGS */
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
      "experienceBookings"
    );

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setBookings(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  /* ❌ CANCEL + RESTORE SLOT */
  const cancelBooking = async (booking) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      // 🔥 FORCE STRING CONVERSION (THIS FIXES indexOf ERROR)
      const experienceId = String(booking.experienceId);
      const date = String(booking.date);
      const time = String(booking.time);

      const bookingRef = doc(
        db,
        "users",
        user.uid,
        "experienceBookings",
        booking.id
      );

      const slotRef = doc(
        db,
        "experiences",
        experienceId,
        "availability",
        date,
        "slots",
        time
      );

      await runTransaction(db, async (transaction) => {
        const slotSnap = await transaction.get(slotRef);

        if (!slotSnap.exists()) {
          throw new Error("Slot not found");
        }

        const currentCapacity = slotSnap.data().capacity || 0;

        // 🔥 RESTORE CAPACITY
        transaction.update(slotRef, {
          capacity: currentCapacity + Number(booking.guests),
        });

        // 🔥 DELETE BOOKING
        transaction.delete(bookingRef);
      });

    } catch (err) {
      console.error("Cancel failed:", err);
      alert(err.message);
    }
  };

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">
            Your experiences
          </h1>

          <Link
            to="/experiences"
            className="text-sm text-rose-500 hover:underline"
          >
            Browse experiences →
          </Link>
        </div>

        {!user ? (
          <p>Please log in to view bookings</p>
        ) : loading ? (
          <p>Loading…</p>
        ) : bookings.length === 0 ? (
          <p>You haven’t booked any experiences yet 🌍</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border rounded-xl p-5 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {b.location}
                  </p>
                  <p className="text-sm mt-1">
                    {new Date(b.date).toDateString()} · {b.time}
                  </p>
                  <p className="text-sm mt-1">
                    {b.guests} guest{b.guests > 1 && "s"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹{b.price}</p>
                  <button
                    onClick={() => cancelBooking(b)}
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
