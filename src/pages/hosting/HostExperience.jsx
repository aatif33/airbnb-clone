import PageWrapper from "../../components/common/PageWrapper";

export default function HostExperience() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Airbnb your experience
        </h1>

        <p className="text-gray-600 mb-6">
          Share what you love by hosting unique experiences.
        </p>

        <ul className="space-y-4">
          <li className="border rounded-xl p-5">
            Create engaging experiences
          </li>
          <li className="border rounded-xl p-5">
            Set your availability and pricing
          </li>
          <li className="border rounded-xl p-5">
            Meet people from around the world
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
}