import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function AirCover() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-semibold mb-4">
            AirCover
          </h1>

          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            AirCover is comprehensive protection included with every Airbnb booking —
            giving guests and hosts peace of mind.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Guest protection
              </h2>
              <p className="text-gray-600 text-sm">
                Booking protection, check-in guarantee, and access to 24/7 safety
                support.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Host protection
              </h2>
              <p className="text-gray-600 text-sm">
                Includes Host Damage Protection and Host Liability Insurance for
                every stay.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">
                Always included
              </h2>
              <p className="text-gray-600 text-sm">
                Automatically applied — no signup or extra fees required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}
