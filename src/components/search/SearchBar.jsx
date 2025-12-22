import { useSearch } from "../../context/SearchContext";

export default function SearchBar({ compact, active, setActive }) {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div
      className={`
        relative transition-all duration-300 ease-in-out
        ${compact
          ? "w-[380px] h-12 scale-95 shadow-md"
          : "w-[720px] h-16 scale-100 shadow-xl"}
        ${active ? "z-50" : "z-10"}
      `}
    >
      <div
        className={`
          flex items-center bg-white rounded-full border
          px-4 h-full
          transition-all duration-300
          ${compact ? "gap-3" : "gap-6"}
        `}
      >
        {/* WHERE */}
        <div className="flex-1">
          <p className="text-xs font-semibold">Where</p>
          <input
            value={searchQuery}
            onFocus={() => setActive(true)}
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
              <p className="text-sm text-gray-400">Add dates</p>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* WHO */}
            <div className="flex-1">
              <p className="text-xs font-semibold">Who</p>
              <p className="text-sm text-gray-400">Add guests</p>
            </div>
          </>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={() => setActive(false)}
          className={`
            flex items-center justify-center
            rounded-full bg-rose-500 text-white
            transition-all duration-300
            ${compact ? "w-10 h-10" : "w-12 h-12"}
          `}
        >
          🔍
        </button>
      </div>
    </div>
  );
}
