import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        inline-flex items-center gap-2
        text-sm font-medium text-gray-700
        hover:text-black
        active:scale-95 transition
      "
    >
      ← Back
    </button>
  );
}
