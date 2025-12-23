import { motion } from "framer-motion";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl w-[400px] p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Log in or sign up</h2>

        <input
          type="text"
          placeholder="Phone number"
          className="w-full border rounded-lg p-3 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button className="w-full bg-rose-500 text-white py-3 rounded-lg mb-3">
          Continue
        </button>

        <div className="text-center text-sm text-gray-500 mb-3">
          or
        </div>

        <button className="w-full border py-3 rounded-lg mb-2">
          Continue with Google
        </button>

        <button className="w-full border py-3 rounded-lg">
          Continue with Microsoft
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline w-full"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
