import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function Community() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Community forum
        </h1>

        <p className="text-gray-600">
          Connect with other hosts and share experiences.
        </p>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}