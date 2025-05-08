import StudentList from "../components/StudentList";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6 transition-colors duration-300 ease-in-out">
      
      {/* Dismissible success message */}
      {successMsg && (
        <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center shadow-md transition-all duration-300 ease-in-out">
          <span className="block">{successMsg}</span>
          <button
            onClick={() => setSuccessMsg("")}
            className="absolute top-1 right-2 text-green-700 font-extrabold text-2xl leading-none hover:text-green-900 transition-colors duration-200"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8 transition-all duration-300">
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold text-blue-800 transition-colors duration-300">
            Student Dashboard
          </h1>
        </div>
        <div className="flex-none">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Student list */}
      <StudentList />
    </div>
  );
}
