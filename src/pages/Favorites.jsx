import { listings } from "../data/listings";
import { useFavorites } from "../context/FavoritesContext";
import ListingCard from "../components/listings/ListingCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  const favoriteListings = listings.filter((l) =>
    favorites.includes(l.id)
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Your favorites</h2>

      {favoriteListings.length === 0 ? (
        <p className="text-gray-500">
          You haven’t saved any stays yet ❤️
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
