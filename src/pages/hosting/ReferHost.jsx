import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function ReferHost() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Refer a host
        </h1>

        <p className="text-gray-600">
          Invite friends to host and earn rewards.
        </p>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}