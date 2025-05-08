import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(""); // Course filter
  const [searchQuery, setSearchQuery] = useState(""); // Name search filter
  const navigate = useNavigate();

  // Fetch students from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    });

    return () => unsub();
  }, []);

  // Delete student from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Get unique course options
  const courseOptions = [...new Set(students.map((s) => s.course))];

  // Filter students by course
  const filteredByCourse = filter
    ? students.filter((s) => s.course === filter)
    : students;

  // Further filter students by search query
  const filteredStudents = filteredByCourse.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Filter + Search + Add Student */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4 sm:gap-0">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded bg-white w-full sm:w-auto"
        >
          <option value="">All Courses</option>
          {courseOptions.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 border p-2 rounded bg-white mt-4 sm:mt-0 sm:ml-4"
        />

        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto mt-4 sm:mt-0"
        >
          Add Student
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center text-gray-600 font-semibold text-xl col-span-3">
            No students found
          </div>
        )}
      </div>
    </div>
  );
}
