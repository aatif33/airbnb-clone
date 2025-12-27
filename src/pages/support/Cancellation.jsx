import PageWrapper from "../../components/common/PageWrapper";

export default function Cancellation() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Cancellation options
        </h1>

        <p className="text-gray-600 mb-6">
          Cancellation policies depend on the host and booking type.
        </p>

        <ul className="space-y-4">
          <li className="border rounded-xl p-5">
            <h3 className="font-medium">Flexible</h3>
            <p className="text-sm text-gray-500">
              Full refund if cancelled within allowed period.
            </p>
          </li>

          <li className="border rounded-xl p-5">
            <h3 className="font-medium">Moderate / Strict</h3>
            <p className="text-sm text-gray-500">
              Partial refunds based on timing.
            </p>
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
}


