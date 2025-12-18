import { listings } from "../data/listings";
import ListingGrid from "../components/listings/ListingGrid";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const { searchQuery } = useSearch();

  console.log("LISTINGS:", listings);
  console.log("SEARCH QUERY:", searchQuery);

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("FILTERED:", filteredListings);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <ListingGrid listings={filteredListings} />
    </section>
  );
}
