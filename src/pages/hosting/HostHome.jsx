import PageWrapper from "../../components/common/PageWrapper";
import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
export default function HostHome() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">
          Airbnb your home
        </h1>
        <p className="text-gray-600 mb-8">
          Earn by sharing your space with guests from around the world.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <HostCard
            title="Get started"
            desc="List your home in a few simple steps."
          />
          <HostCard
            title="Host protections"
            desc="AirCover gives you peace of mind."
          />
          <HostCard
            title="Earnings"
            desc="See how much you could earn hosting."
          />
        </div>

        <div className="mt-10">
          <Link
            to="/host/resources"
            className="text-rose-500 font-medium hover:underline"
          >
            Explore hosting resources →
          </Link>
        </div>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}

function HostCard({ title, desc }) {
  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition">
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}