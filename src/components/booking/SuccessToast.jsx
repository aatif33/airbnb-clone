import { useEffect } from "react";

export default function SuccessToast({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg animate-slideUp">
      ✅ Booking successful!
    </div>
  );
}
