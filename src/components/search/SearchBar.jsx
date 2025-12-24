import { useState } from "react";
import { useSearch } from "../../context/SearchContext";

/* 🔥 Airbnb-style date formatter */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

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

  const [activeSection, setActiveSection] = useState(null);
  // "where" | "when" | "who"

  return (
    <div
      className={`
        relative mx-auto bg-white rounded-full z-50
        transition-all duration-300
        ${compact ? "w-[380px] h-12" : "w-[720px] h-16"}
        ${active ? "shadow-xl scale-100" : "shadow-md scale-95"}
      `}
    >
      {/* MAIN BAR */}
      <div className="flex items-center h-full px-4 gap-4">
        {/* WHERE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActive(true);
            setActiveSection("where");
          }}
          className="flex-1 text-left"
        >
          <p className="text-xs font-semibold">Where</p>
          <p className="text-sm text-gray-500 truncate">
            {searchQuery || "Search destinations"}
          </p>
        </button>

        {!compact && <div className="h-8 w-px bg-gray-200" />}

        {/* WHEN */}
        {!compact && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActive(true);
              setActiveSection("when");
            }}
            className="flex-1 text-left"
          >
            <p className="text-xs font-semibold">When</p>
            <p className="text-sm text-gray-500">
              {checkIn && checkOut
                ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
                : "Add dates"}
            </p>
          </button>
        )}

        {!compact && <div className="h-8 w-px bg-gray-200" />}

        {/* WHO */}
        {!compact && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActive(true);
              setActiveSection("who");
            }}
            className="flex-1 text-left"
          >
            <p className="text-xs font-semibold">Who</p>
            <p className="text-sm text-gray-500">
              {guests} guest{guests > 1 && "s"}
            </p>
          </button>
        )}

        {/* SEARCH ICON */}
        <button
          onClick={() => setActive(false)}
          className="ml-2 bg-rose-500 text-white w-10 h-10 rounded-full active:scale-95 transition"
        >
          🔍
        </button>
      </div>

      {/* DROPDOWN PANEL */}
      {active && activeSection && (
        <div
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2
                     w-full max-w-xl bg-white rounded-2xl shadow-xl
                     p-6 animate-slideUp"
        >
          {/* WHERE PANEL */}
          {activeSection === "where" && (
            <>
              <h3 className="font-semibold mb-3">Search location</h3>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city or place"
                className="w-full border rounded-lg p-3"
              />
            </>
          )}

          {/* WHEN PANEL */}
          {activeSection === "when" && (
            <>
              <h3 className="font-semibold mb-3">Select dates</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border rounded-lg p-3"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setActive(false);
                    setActiveSection(null);
                  }}
                  className="border rounded-lg p-3"
                />
              </div>
            </>
          )}

          {/* WHO PANEL */}
          {activeSection === "who" && (
            <>
              <h3 className="font-semibold mb-3">Guests</h3>
              <div className="flex items-center justify-between">
                <span>Guests</span>
                <div className="flex items-center gap-4">
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
            </>
          )}

          <button
            onClick={() => {
              setActive(false);
              setActiveSection(null);
            }}
            className="mt-6 text-sm text-gray-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
