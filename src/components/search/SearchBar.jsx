import { useSearch } from "../../context/SearchContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search stays"
      className="border rounded-full px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-rose-500 outline-none"
    />
  );
}
