export default function MapPreview({ onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-xl transition"
    >
      <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=4&size=600x400"
        alt="Map preview"
        className="w-full h-64 object-cover"
      />
      <div className="bg-white p-3 text-center font-medium">
        Show map
      </div>
    </div>
  );
}
