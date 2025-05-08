import { useEffect } from "react";
import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function AddMockStudents() {
  useEffect(() => {
    const students = [
      { name: "Aryan Sharma", course: "Computer Science" },
      { name: "Priya Singh", course: "Electronics" },
      { name: "Ravi Kumar", course: "Mechanical" },
      { name: "Sneha Verma", course: "Civil" },
      { name: "Rahul Joshi", course: "IT" },
      { name: "Megha Patel", course: "Computer Science" },
      { name: "Vikram Yadav", course: "Electrical" },
      { name: "Anjali Mishra", course: "Mechanical" },
      { name: "Siddharth Rao", course: "Civil" },
      { name: "Nikita Roy", course: "IT" },
    ];

    const addMockStudents = async () => {
      const collectionRef = collection(db, "students");
      for (const student of students) {
        try {
          await addDoc(collectionRef, student);
          console.log(`Added: ${student.name}`);
        } catch (err) {
          console.error("Error adding student:", err);
        }
      }
    };

    addMockStudents();
  }, []);

  return (
    <div className="text-center mt-10 text-green-700 font-bold">
      Mock students are being added to Firestore. Check console for status.
    </div>
  );
}
