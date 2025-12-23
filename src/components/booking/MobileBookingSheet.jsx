import { useEffect } from "react";

export default function MobileBookingSheet({
  open,
  onClose,
  checkIn,
  checkOut,
  guests,
  setCheckIn,
  setCheckOut,
  setGuests,
  onContinue,
}) {
  // lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* SHEET */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl
        transform transition-transform duration-300 ease-out
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* HANDLE */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your trip</h3>
            <button onClick={onClose} className="text-xl">✕</button>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border rounded-lg p-2"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>

          {/* GUESTS */}
          <div className="flex justify-between items-center border rounded-lg p-3 mb-6">
            <span>Guests</span>
            <div className="flex gap-4 items-center">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium active:scale-95 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
