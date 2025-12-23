import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

export default function ListingCard({ listing }) {
  const { id, title, price, image, location, rating } = listing;
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.includes(id);

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavorite(id)}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <Link to={`/listing/${id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
          <img src={image} alt={title} className="h-56 w-full object-cover" />

          <div className="p-4 space-y-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">{title}</h3>
              <span>⭐ {rating}</span>
            </div>

            <p className="text-sm text-gray-500">{location}</p>

            <p className="text-gray-700">
              ₹{price} <span className="text-sm">/ night</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
