import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import PageWrapper from "../components/common/PageWrapper";
import { useState } from "react";

export default function ServiceDetails() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  const [hours, setHours] = useState(1);

  if (!service) {
    return <PageWrapper>Service not found</PageWrapper>;
  }

  const total = service.price * hours;

  return (
    <PageWrapper>
      <section className="max-w-4xl mx-auto px-6 py-10 pb-32">
        <Link to="/services" className="text-sm text-gray-500">
          ← Back
        </Link>

        <h1 className="text-3xl font-semibold mt-4">
          {service.title}
        </h1>

        <img
          src={service.image}
          className="w-full h-[380px] object-cover rounded-2xl my-8"
          alt={service.title}
        />

        <p className="text-gray-600 mb-6">
          {service.description}
        </p>

        <h2 className="text-xl font-semibold mb-3">
          Duration
        </h2>

        <div className="flex items-center gap-6 mb-20">
          <button
            onClick={() => setHours(Math.max(1, hours - 1))}
            className="w-8 h-8 border rounded-full"
          >
            −
          </button>

          <span>{hours} hour(s)</span>

          <button
            onClick={() => setHours(hours + 1)}
            className="w-8 h-8 border rounded-full"
          >
            +
          </button>
        </div>

        {/* STICKY BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between">
            <div>
              From ₹{total}
              <p className="text-sm text-gray-500">
                Pay after confirmation
              </p>
            </div>

            <button className="bg-rose-500 text-white px-6 py-3 rounded-lg">
              Request service
            </button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
