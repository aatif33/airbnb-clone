import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ open, onClose }) {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    setError("");
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.code);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold mb-4">
          {isSignup ? "Sign up" : "Login"}
        </h2>

        {error && (
          <p className="text-sm text-red-500 mb-2">{error}</p>
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
          className="w-full bg-rose-500 text-white py-2 rounded"
        >
          Continue
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm text-center mt-3 cursor-pointer text-rose-500"
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}
