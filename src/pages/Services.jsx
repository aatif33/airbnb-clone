import PageWrapper from "../components/common/PageWrapper";
import { services } from "../data/services";
import ServiceGrid from "../components/services/ServiceGrid";

export default function Services() {
  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-2">
          Services
        </h1>

        <p className="text-gray-600 mb-8">
          Book trusted professionals for your home and events
        </p>

        <ServiceGrid services={services} />
      </section>
    </PageWrapper>
  );
}
