import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
export default function ListingCard({ listing }) {
  const { id, title, price, image, location, rating } = listing;
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const isFav = favorites.includes(id);

  return (
    <motion.div
  whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 300 }}
>
    <div className="relative">
      {/* FAVORITE BUTTON */}
      <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!user) {
              alert("Please login to save favorites ❤️");
              return;
            }

            toggleFavorite(id);
          }}

      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* CARD */}
      <Link to={`/listing/${id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
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
              ₹{price} <span className="text-sm">/ night</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
</motion.div>  );
}
