import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ open, onClose }) {
  const { login, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login"); // login | signup

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setError("");
      setMode("login");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    if (mode === "signup") {
      setMode("login"); // go back to login
      setError("");
    } else {
      onClose(); // close modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 relative">

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={handleBack}
          className="absolute left-4 top-4 text-sm text-gray-500 hover:text-black"
        >
          ← Back
        </button>
       <p className="text-lg font-semibold mb-4 text-center">Welcome to Airbnb</p>
        <h2 className="text-lg font-semibold mb-4 text-center">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">
            {error}
          </p>
        )}

        <input
          className="border w-full p-2 rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-rose-500 text-white py-2 rounded active:scale-95 transition"
        >
          {mode === "login" ? "Log in" : "Sign up"}
        </button>

        {/* MODE TOGGLE */}
        <p className="text-sm text-center mt-4">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-rose-500 font-medium hover:underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-rose-500 font-medium hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
