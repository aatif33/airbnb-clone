import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

export default function ListingCard({ listing }) {
  const { id, title, price, image, location, rating } = listing;
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="relative">
      {/* ❤️ HEART ICON */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(id);
        }}
        className="absolute top-3 right-3 z-10 text-xl"
      >
        {isFavorite(id) ? "❤️" : "🤍"}
      </button>

      <Link to={`/listing/${id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover"
          />

          <div className="p-4 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{title}</h3>
              <span className="text-sm">⭐ {rating}</span>
            </div>

            <p className="text-sm text-gray-500">{location}</p>

            <p className="text-gray-700">
              ₹{price} <span className="text-sm text-gray-500">/ night</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
