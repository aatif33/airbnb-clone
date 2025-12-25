export default function ExperienceBookingBar({ experience }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>
          <p className="font-semibold">
            From ₹{experience.price} <span className="font-normal">/ guest</span>
          </p>
          <p className="text-sm text-gray-500">
            Free cancellation
          </p>
        </div>

        <button className="bg-rose-500 text-white px-8 py-3 rounded-lg font-medium active:scale-95 transition">
          Book
        </button>
      </div>
    </div>
  );
}
