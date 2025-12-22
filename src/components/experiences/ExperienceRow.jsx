import ExperienceCard from "./ExperienceCard";

export default function ExperienceRow({ title, subtitle, data }) {
  return (
    <section className="mt-12">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {data.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
