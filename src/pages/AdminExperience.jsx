import PageWrapper from "../components/common/PageWrapper";
import { generateAvailability } from "../utils/generateExperienceAvailability";

export default function AdminExperience() {
  return (
    <PageWrapper>
      <section className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">
          Admin · Generate Experience Slots
        </h1>

        {[1, 2, 3, 4].map((id) => (
          <button
            key={id}
            onClick={() => generateAvailability(String(id))}
            className="block w-full mb-4 bg-black text-white py-3 rounded-lg"
          >
            Generate slots for Experience {id}
          </button>
        ))}
      </section>
    </PageWrapper>
  );
}
