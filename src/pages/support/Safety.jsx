import PageWrapper from "../../components/common/PageWrapper";

export default function Safety() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4">
          Get help with a safety issue
        </h1>

        <p className="text-gray-600 mb-6">
          Your safety matters. If you’re in danger or feel unsafe, take action
          immediately.
        </p>

        <div className="space-y-4">
          <div className="border rounded-xl p-5">
            <h3 className="font-medium">Emergency situations</h3>
            <p className="text-sm text-gray-500">
              Contact local emergency services first.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-medium">Report a safety concern</h3>
            <p className="text-sm text-gray-500">
              Use our platform to report issues related to your stay.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}