import PageWrapper from "../../components/common/PageWrapper";

export default function HostService() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Airbnb your service
        </h1>

        <p className="text-gray-600 mb-6">
          Offer professional services like photography, cooking, or cleaning.
        </p>

        <div className="grid gap-4">
          <div className="border rounded-xl p-5">
            List your skills
          </div>
          <div className="border rounded-xl p-5">
            Set your service area
          </div>
          <div className="border rounded-xl p-5">
            Get bookings easily
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}