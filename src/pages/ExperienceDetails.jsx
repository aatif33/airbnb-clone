import { useParams, Link } from "react-router-dom";
import { experiences } from "../data/experiences";
import PageWrapper from "../components/common/PageWrapper";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { generateAvailability } from "../utils/generateExperienceAvailability";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function ExperienceDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const all = [...experiences.originals, ...experiences.local];
  const experience = all.find((e) => String(e.id) === id);

  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guests, setGuests] = useState(1);

  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!experience) {
    return <PageWrapper>Experience not found</PageWrapper>;
  }

  /* 🔥 GENERATE AVAILABILITY ONCE */
  useEffect(() => {
    generateAvailability(id);
  }, [id]);

  /* 🔥 LOAD DATES */
  useEffect(() => {
    const loadDates = async () => {
      setLoadingDates(true);
      const ref = collection(db, "experiences", id, "availability");
      const snap = await getDocs(ref);
      setDates(snap.docs.map((d) => d.id));
      setLoadingDates(false);
    };
    loadDates();
  }, [id]);

  /* 🔥 LOAD SLOTS */
  useEffect(() => {
    if (!selectedDate) return;

    const loadSlots = async () => {
      setLoadingSlots(true);
      const ref = collection(
        db,
        "experiences",
        id,
        "availability",
        selectedDate,
        "slots"
      );
      const snap = await getDocs(ref);
      setSlots(snap.docs.map((d) => ({ time: d.id, ...d.data() })));
      setLoadingSlots(false);
    };

    loadSlots();
  }, [id, selectedDate]);

  const selectedSlotData = slots.find((s) => s.time === selectedSlot);
  const maxGuests = selectedSlotData?.capacity || 1;
  const totalPrice = experience.price * guests;

  const bookExperience = async () => {
    if (!user) return alert("Please login");
    if (!selectedSlotData) return;

    setBooking(true);

    await addDoc(
      collection(db, "users", user.uid, "experienceBookings"),
      {
        experienceId: experience.id,
        title: experience.title,
        location: experience.location,
        date: selectedDate,
        time: selectedSlot,
        guests,
        price: totalPrice,
        createdAt: serverTimestamp(),
      }
    );

    setBooking(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10 pb-40">
        <Link to="/experiences" className="text-sm text-gray-500">
          ← Back
        </Link>

        <h1 className="text-3xl font-semibold">{experience.title}</h1>
        <p className="text-gray-600">{experience.location}</p>

        <img
          src={experience.image}
          className="w-full h-[420px] object-cover rounded-2xl my-8"
        />

        <h2 className="text-xl font-semibold mb-3">Select a date</h2>

        {loadingDates ? (
          <p>Loading dates…</p>
        ) : (
          <div className="flex gap-3 flex-wrap mb-8">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                  setGuests(1);
                }}
                className={`px-4 py-2 rounded-full border ${
                  selectedDate === date ? "bg-black text-white" : ""
                }`}
              >
                {new Date(date).toDateString()}
              </button>
            ))}
          </div>
        )}

        {selectedDate && (
          <>
            <h2 className="text-xl font-semibold mb-3">Choose a time</h2>

            {loadingSlots ? (
              <p>Loading slots…</p>
            ) : (
              <div className="flex gap-3 flex-wrap mb-8">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSlot === slot.time
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {slot.time} · {slot.capacity} spots
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {success && (
          <div className="fixed bottom-24 left-6 bg-green-600 text-white px-6 py-4 rounded-xl">
            🎉 Experience booked successfully!
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
            <div>
              From ₹{totalPrice} / {guests} guest
              <p className="text-sm text-gray-500">Free cancellation</p>
            </div>

            <button
              onClick={bookExperience}
              disabled={!selectedSlotData || booking}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg"
            >
              {booking ? "Booking…" : "Book"}
            </button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}