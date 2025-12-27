import PageWrapper from "../../components/common/PageWrapper";
import PageTransition from "../../components/common/PageTransition";
export default function Resources() {
  return (
    <PageTransition>
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Hosting resources
        </h1>

        <ul className="space-y-4">
          <li className="border rounded-xl p-5">
            Hosting best practices
          </li>
          <li className="border rounded-xl p-5">
            Pricing tips
          </li>
          <li className="border rounded-xl p-5">
            Guest communication
          </li>
        </ul>
      </div>
    </PageWrapper>
    </PageTransition>
  );
}
