import PageWrapper from "../../components/common/PageWrapper";

export default function AntiDiscrimination() {
  return (
    <PageWrapper>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-semibold mb-4">
            Anti-discrimination policy
          </h1>

          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Airbnb is committed to building a world where anyone can belong —
            without discrimination.
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Our commitment
              </h2>
              <p className="text-gray-600 text-sm">
                Discrimination based on race, religion, gender identity, disability,
                sexual orientation, nationality, or age is not tolerated.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Expectations for hosts & guests
              </h2>
              <p className="text-gray-600 text-sm">
                Everyone using Airbnb must treat others with respect and fairness
                at all times.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Reporting discrimination
              </h2>
              <p className="text-gray-600 text-sm">
                If you experience discrimination, contact Airbnb Support immediately
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}