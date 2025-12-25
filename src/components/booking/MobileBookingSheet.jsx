import { useEffect } from "react";
import { DateRange } from "react-date-range";

export default function MobileBookingSheet({
  open,
  onClose,
  dateRange,
  setDateRange,
  guests,
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
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* SHEET */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl
        transition-transform duration-300
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* HANDLE */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your trip</h3>
            <button onClick={onClose} className="text-xl">✕</button>
          </div>

          {/* ✅ AIRBNB-STYLE CALENDAR */}
          <DateRange
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            minDate={new Date()}
            rangeColors={["#f43f5e"]}
            showDateDisplay={false}
            direction="vertical"
          />

          {/* GUESTS */}
          <div className="flex justify-between items-center border rounded-lg p-4">
            <span className="font-medium">Guests</span>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 border rounded-full"
              >
                −
              </button>
              <span>{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 border rounded-full"
              >
                +
              </button>
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
