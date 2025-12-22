export default function ExperienceCard({ item }) {
  return (
    <div className="min-w-[260px]">
      <div className="relative">
        <img
          src={item.image}
          className="h-64 w-full object-cover rounded-2xl"
        />

        <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full font-medium">
          Original
        </span>

        <span className="absolute top-3 right-3 text-xl bg-white p-2 rounded-full">
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
  );
}
