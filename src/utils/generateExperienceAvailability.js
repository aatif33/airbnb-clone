import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export async function generateAvailability(experienceId) {
  const today = new Date();
  const days = 7; // next 7 days

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateId = date.toISOString().split("T")[0];

    // create date doc
    await setDoc(
      doc(db, "experiences", experienceId, "availability", dateId),
      { enabled: true }
    );

    // slots
    const slots = [
      { time: "10:00 AM", capacity: 5 },
      { time: "2:30 PM", capacity: 3 },
      { time: "5:00 PM", capacity: 4 },
    ];

    for (const slot of slots) {
      await setDoc(
        doc(
          db,
          "experiences",
          experienceId,
          "availability",
          dateId,
          "slots",
          slot.time
        ),
        { capacity: slot.capacity }
      );
    }
  }

  console.log(`✅ Availability generated for experience ${experienceId}`);
}