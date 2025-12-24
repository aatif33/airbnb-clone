import { useSearch } from "../../context/SearchContext";

export default function SearchBar({ compact, active, setActive }) {
  const {
    searchQuery,
    setSearchQuery,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
  } = useSearch();

  return (
    <div
      onClick={() => setActive(true)}
      className={`
        relative mx-auto bg-white rounded-full z-50
        transition-all duration-300 ease-out
        ${active ? "scale-100 shadow-xl" : "scale-95 shadow-md"}
        ${compact ? "w-[380px] h-12" : "w-[720px] h-16"}
      `}
    >
      {/* MAIN BAR */}
      <div
        className={`
          flex items-center h-full px-4 border rounded-full
          ${compact ? "gap-3" : "gap-6"}
        `}
      >
        {/* WHERE */}
        <div className="flex-1">
          <p className="text-xs font-semibold">Where</p>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations"
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {!compact && (
          <>
            <div className="h-8 w-px bg-gray-200" />

            {/* WHEN */}
            <div className="flex-1">
              <p className="text-xs font-semibold">When</p>
              <p className="text-sm text-gray-500">
                {checkIn && checkOut
                  ? `${checkIn} → ${checkOut}`
                  : "Add dates"}
              </p>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* WHO */}
            <div className="flex-1">
              <p className="text-xs font-semibold">Who</p>
              <p className="text-sm text-gray-500">
                {guests} guest{guests > 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center
                     active:scale-95 transition-transform"
        >
          🔍
        </button>
      </div>

      {/* DROPDOWN PANEL */}
      {!compact && active && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl p-6 animate-slideUp"
        >
          {/* DATES */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs font-semibold">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          {/* GUESTS */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Guests</p>
              <p className="text-sm text-gray-500">Ages 13+</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 border rounded-full flex items-center justify-center
                           active:scale-95 transition"
              >
                −
              </button>

              <span>{guests}</span>

              <button
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 border rounded-full flex items-center justify-center
                           active:scale-95 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
