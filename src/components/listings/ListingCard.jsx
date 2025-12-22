import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`}>
      <div className="min-w-[260px]">
        <div className="relative">
          <img
            src={listing.image}
            className="h-64 w-full object-cover rounded-2xl"
          />

          <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full font-medium">
            Guest favourite
          </span>

          <span className="absolute top-3 right-3 text-xl">♡</span>
        </div>

        <div className="mt-2">
          <h3 className="font-medium">{listing.title}</h3>
          <p className="text-sm text-gray-500">
            ₹{listing.price} for 2 nights · ⭐ {listing.rating}
          </p>
        </div>
      </div>
    </Link>
  );
}
