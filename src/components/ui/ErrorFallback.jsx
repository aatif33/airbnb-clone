export default function ErrorFallback({ message }) {
  return (
    <div className="text-red-600 text-center p-4">
      {message || "Something went wrong"}
    </div>
  );
}
