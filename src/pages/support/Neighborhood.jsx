import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function Neighborhood() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Report neighbourhood concern
        </h1>

        <p className="text-gray-600 mb-6">
          Let us know if there are noise or community issues.
        </p>

        <div className="border rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Reports are reviewed and handled responsibly.
          </p>
        </div>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}