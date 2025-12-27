import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">Help Centre</h1>
        <p className="text-gray-600 mb-8">
          Get answers, manage your bookings, and find support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HelpCard
            title="Cancellation options"
            desc="Learn how cancellations work and what refunds you can expect."
            link="/support/cancellation"
          />
          <HelpCard
            title="Safety issues"
            desc="Get help with urgent safety concerns."
            link="/support/safety"
          />
          <HelpCard
            title="Neighbourhood concerns"
            desc="Report a noise or neighbourhood issue."
            link="/support/neighbourhood"
          />
          <HelpCard
            title="AirCover protection"
            desc="Understand how AirCover protects guests and hosts."
            link="/policies/aircover"
          />
        </div>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}

function HelpCard({ title, desc, link }) {
  return (
    <Link
      to={link}
      className="border rounded-xl p-5 hover:shadow-md transition block"
    >
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  );
}