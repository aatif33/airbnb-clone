import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function CoHost() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Find a co-host
        </h1>

        <p className="text-gray-600">
          Get help managing your listings with trusted co-hosts.
        </p>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}