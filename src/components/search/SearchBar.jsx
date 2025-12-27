import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

/* date formatter */
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

export default function SearchBar({ compact, active, setActive }) {
  const {
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    guests,
    setGuests,
  } = useSearch();

  const [activeSection, setActiveSection] = useState(null);

  const startDate = dateRange[0].startDate;
  const endDate = dateRange[0].endDate;

  return (
    <div
      className={`
        relative mx-auto bg-white rounded-full z-50
        transition-all duration-300
        ${compact ? "w-[380px] h-12" : "w-[520px] h-16"}
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
              {startDate && endDate
                ? `${formatDate(startDate)} – ${formatDate(endDate)}`
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

        <button
          onClick={() => setActive(false)}
          className="ml-2 bg-rose-500 text-white w-10 h-10 rounded-full active:scale-95 transition"
        >
          🔍
        </button>
      </div>

      {/* DROPDOWN */}
      {active && activeSection && (
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-6 animate-slideUp">
          {/* WHERE */}
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

          {/* WHEN — REAL CALENDAR */}
          {activeSection === "when" && (
            <>
              <h3 className="font-semibold mb-4">Select dates</h3>
              <DateRange
                ranges={dateRange}
                onChange={(item) => setDateRange([item.selection])}
                minDate={new Date()}
                rangeColors={["#ef4444"]}
              />
            </>
          )}

          {/* WHO */}
          {activeSection === "who" && (
            <>
              <h3 className="font-semibold mb-3">Guests</h3>
              <div className="flex justify-between items-center">
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
