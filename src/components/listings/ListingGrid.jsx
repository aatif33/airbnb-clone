import ListingCard from "./ListingCard";

export default function ListingGrid({ listings }) {
  if (listings.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No stays found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
