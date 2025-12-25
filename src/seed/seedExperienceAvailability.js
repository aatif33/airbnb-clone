import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

async function seed() {
  await setDoc(
    doc(
      db,
      "experiences",
      "1",
      "availability",
      "2025-02-11",
      "slots",
      "2:30 PM"
    ),
    { capacity: 3 }
  );

  console.log("✅ Availability seeded");
}

seed();
