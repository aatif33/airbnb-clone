import { Link } from "react-router-dom";

export default function ExperienceCard({ item }) {
  return (
    <Link to={`/experience/${item.id}`}>
      <div className="min-w-[260px]">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="h-64 w-full object-cover rounded-2xl"
          />

          <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full font-medium">
            Original
          </span>
        </div>

        <div className="mt-2 space-y-1">
          <h3 className="font-medium leading-snug">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.location}</p>
          <p className="text-sm">
            From ₹{item.price} / guest
          </p>
        </div>
      </div>
    </Link>
  );
}
