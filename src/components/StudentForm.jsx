import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function StudentForm({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    onAdd(data);
    reset();
    navigate("/"); // redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 transition-colors duration-500 ease-in-out relative">
      
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 bg-blue-400 text-700 px-4 py-2 rounded shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        Home
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700 transition-colors duration-300">
          Add New Student
        </h2>

        <div className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            {...register("course", { required: true })}
            placeholder="Course"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}
