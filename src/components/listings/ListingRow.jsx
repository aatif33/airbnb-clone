import ListingCard from "./ListingCard";

export default function ListingRow({ title, listings }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-xl">→</button>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {listings.map((item) => (
          <ListingCard key={item.id} listing={item} horizontal />
        ))}
      </div>
    </section>
  );
}
