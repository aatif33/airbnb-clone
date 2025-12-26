import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`}>
      <div className="cursor-pointer">
        <img
          src={service.image}
          className="h-56 w-full object-cover rounded-2xl"
          alt={service.title}
        />

        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-500">{service.category}</p>
          <h3 className="font-medium">{service.title}</h3>
          <p className="text-sm">
            From ₹{service.price} · {service.duration}
          </p>
        </div>
      </div>
    </Link>
  );
}
