import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import PageWrapper from "../components/common/PageWrapper";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      const q = query(
        collection(db, "users", user.uid, "bookings"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBookings();
  }, [user]);

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Your trips</h1>

        {!user ? (
          <p>Please login to view trips</p>
        ) : bookings.length === 0 ? (
          <p>You don’t have any trips yet 🧳</p>
        ) : (
          <div className="space-y-6">
            {bookings.map(b => (
              <div key={b.id} className="border p-5 rounded-xl">
                <h3 className="font-semibold">{b.title}</h3>
                <p>{b.checkIn} → {b.checkOut}</p>
                <p>₹{b.totalPrice}</p>
                <p className="text-sm">Paid via {b.paymentMethod}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
