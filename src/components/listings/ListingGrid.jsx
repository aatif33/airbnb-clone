import ListingCard from "./ListingCard";
import ListingSkeleton from "./ListingSkeleton";
import { useEffect, useState } from "react";

export default function ListingGrid({ listings }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ListingSkeleton key={i} />
          ))
        : listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
    </div>
  );
}








