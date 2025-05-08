import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setError(""); // Clear any previous error
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        navigate("/"); // Redirect to dashboard
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Login</h2>

        {/* Error message */}
        {error && (
          <div className="relative text-red-600 text-center mb-4 p-2 bg-red-100 rounded-md">
            {error}
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 p-1 text-red-600 font-bold text-lg hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-3 rounded-lg text-gray-700"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-3 rounded-lg text-gray-700"
          />
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
