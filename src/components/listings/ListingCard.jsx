import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  const { id, title, price, image, location, rating } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover"
        />

        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm flex items-center gap-1">
              ⭐ {rating}
            </span>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-1">
            📍 {location}
          </p>

          <p className="text-gray-700">
            ₹{price} <span className="text-sm text-gray-500">/ night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
