export default function MapModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[90%] h-[80%] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
        >
          ✕
        </button>

        <iframe
          title="Map"
          src="https://www.google.com/maps?q=India&output=embed"
          className="w-full h-full rounded-2xl"
        />
      </div>
    </div>
  );
}
