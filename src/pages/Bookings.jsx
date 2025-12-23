import PageWrapper from "../components/common/PageWrapper";

export default function Bookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <PageWrapper>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Your trips</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-500">
            You don’t have any trips yet 🧳
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-500">
                    {b.location}
                  </p>
                  <p className="text-sm mt-1">
                    {b.checkIn} → {b.checkOut} · {b.guests} guest(s)
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Paid via {b.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹{b.totalPrice}</p>
                  <p className="text-xs text-gray-400">
                    {b.nights} nights
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
