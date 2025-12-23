export default function Bookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          You haven’t made any bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-6 shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{b.title}</h3>
                <span className="text-sm text-green-600 font-medium">
                  Confirmed
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {b.location}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p>{b.checkIn}</p>
                </div>

                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p>{b.checkOut}</p>
                </div>

                <div>
                  <p className="text-gray-500">Guests</p>
                  <p>{b.guests}</p>
                </div>

                <div>
                  <p className="text-gray-500">Total paid</p>
                  <p className="font-semibold">₹{b.totalPrice}</p>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Paid via {b.paymentMethod.toUpperCase()} ·{" "}
                {new Date(b.bookedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
