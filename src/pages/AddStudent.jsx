import StudentForm from "../components/StudentForm";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  const handleAddStudent = async (student) => {
    try {
      await addDoc(collection(db, "students"), student);
      navigate("/", { state: { message: "Student added successfully!" } });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Student</h1>
      <StudentForm onAdd={handleAddStudent} />
    </div>
  );
}
