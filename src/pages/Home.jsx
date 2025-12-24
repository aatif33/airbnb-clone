import { useState, useEffect } from "react";
import { listings } from "../data/listings";
import { useSearch } from "../context/SearchContext";

import ListingGrid from "../components/listings/ListingGrid";
import SkeletonCard from "../components/common/SkeletonCard";
import MapPreview from "../components/map/MapPreview";
import MapModal from "../components/map/MapModal";
import PageWrapper from "../components/common/PageWrapper";

const getCity = (location) =>
  location.split(",")[0].trim().toLowerCase();

export default function Home() {
  const { searchQuery } = useSearch();
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 FAKE LOADING (skeleton effect)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 🔍 SEARCH FILTER
  const filtered = listings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🗺️ GROUPS
  const bengaluru = filtered.filter(
    (l) => getCity(l.location) === "bengaluru"
  );

  const puducherry = filtered.filter(
    (l) => getCity(l.location) === "puducherry"
  );

  const hyderabad = filtered.filter(
    (l) => getCity(l.location) === "hyderabad"
  );

  const hills = filtered.filter((l) =>
    l.location.toLowerCase().includes("nilgiris")
  );

  // 🧱 SKELETON GRID (reusable)
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">

        {/* BENGALURU */}
        {bengaluru.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">
              Popular homes in Bengaluru
            </h2>

            {loading ? (
              <SkeletonGrid />
            ) : (
              <ListingGrid listings={bengaluru} />
            )}
          </section>
        )}

        {/* PUDUCHERRY */}
        {puducherry.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">
              Available in Puducherry next weekend
            </h2>

            {loading ? (
              <SkeletonGrid />
            ) : (
              <ListingGrid listings={puducherry} />
            )}
          </section>
        )}

        {/* HYDERABAD */}
        {hyderabad.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">
              Stays in Hyderabad
            </h2>

            {loading ? (
              <SkeletonGrid />
            ) : (
              <ListingGrid listings={hyderabad} />
            )}
          </section>
        )}

        {/* HILLS */}
        {hills.length > 0 && (
          <section className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">
              Mountain & hill stays
            </h2>

            {loading ? (
              <SkeletonGrid />
            ) : (
              <ListingGrid listings={hills} />
            )}
          </section>
        )}
      </div>

      {/* MAP */}
      <MapPreview onOpen={() => setShowMap(true)} />
      <MapModal open={showMap} onClose={() => setShowMap(false)} />
    </PageWrapper>
  );
}
