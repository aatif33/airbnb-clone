import ExperienceCard from "./ExperienceCard";

export default function ExperienceRow({ title, subtitle, data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold mb-1">{title}</h2>

      {subtitle && (
        <p className="text-gray-500 mb-6">{subtitle}</p>
      )}

      <div className="flex gap-6 overflow-x-auto pb-2">
        {data.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
