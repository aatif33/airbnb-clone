import DatePickerPanel from "./DatePickerPanel";
import { useSearch } from "../../context/SearchContext";

export default function MobileSearchModal({ open, onClose }) {
  const {
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    guests,
    setGuests,
  } = useSearch();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 animate-slideUp">
      {/* HEADER */}
      <div className="flex items-center mb-6">
        <button onClick={onClose} className="text-xl">←</button>
        <h2 className="flex-1 text-center font-semibold">
          Search
        </h2>
      </div>

      {/* WHERE */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Where</h4>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search destinations"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* WHEN */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">When</h4>
        <DatePickerPanel
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>

      {/* WHO */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Who</h4>
        <div className="flex justify-between items-center">
          <span>Guests</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
            <span>{guests}</span>
            <button onClick={() => setGuests(guests + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={onClose}
        className="w-full bg-rose-500 text-white py-3 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
