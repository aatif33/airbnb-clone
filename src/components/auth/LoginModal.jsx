import { useState } from "react";

export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("signin");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </h2>

        <input className="w-full border p-2 mb-3 rounded" placeholder="Phone number" />
        <input className="w-full border p-2 mb-4 rounded" placeholder="Password" type="password" />

        <button className="w-full bg-rose-500 text-white py-3 rounded mb-3">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </button>

        <button className="w-full border py-2 mb-2">Continue with Google</button>
        <button className="w-full border py-2">Continue with Microsoft</button>

        <p className="text-sm text-center mt-4">
          {mode === "signin" ? "No account?" : "Already have one?"}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-rose-500 ml-1">
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
