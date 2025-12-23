import { listings } from "../data/listings";
import ListingGrid from "../components/listings/ListingGrid";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import MapPreview from "../components/map/MapPreview";
import MapModal from "../components/map/MapModal";
import PageWrapper from "../components/common/PageWrapper";
const getCity = (location) =>
  location.split(",")[0].trim().toLowerCase();

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const { searchQuery } = useSearch();

  // SEARCH FILTER
  const filtered = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // GROUPS
  const bengaluru = filtered.filter(
    (l) => getCity(l.location) === "bengaluru"
  );

  const puducherry = filtered.filter(
    (l) => getCity(l.location) === "puducherry"
  );

  const hyderabad = filtered.filter(
    (l) => getCity(l.location) === "hyderabad"
  );

  const hills = filtered.filter(
    (l) =>
      l.location.toLowerCase().includes("nilgiris")
  );

  return (
    <PageWrapper>
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">

      {bengaluru.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-8
  animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6">
            Popular homes in Bengaluru
          </h2>
          <ListingGrid listings={bengaluru} />
        </section>
      )}

      {puducherry.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-8
  animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6">
            Available in Puducherry next weekend
          </h2>
          <ListingGrid listings={puducherry} />
        </section>
      )}

      {hyderabad.length > 0 && (
       <section className="max-w-7xl mx-auto px-6 py-8
  animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6">
            Stays in Hyderabad
          </h2>
          <ListingGrid listings={hyderabad} />
        </section>
      )}

      {hills.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-8
  animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6">
            Mountain & hill stays
          </h2>
          <ListingGrid listings={hills} />
        </section>
      )}
    </div>
    <MapPreview onOpen={() => setShowMap(true)} />
    <MapModal open={showMap} onClose={() => setShowMap(false)} />
    </PageWrapper>
  );
}
