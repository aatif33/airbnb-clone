import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [dateRange, setDateRange] = useState([
    { startDate: null, endDate: null, key: "selection" },
  ]);

  const [guests, setGuests] = useState(1);

  const resetSearch = () => {
    setSearchQuery("");
    setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
    setGuests(1);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        dateRange,
        setDateRange,
        guests,
        setGuests,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
