export default function StudentCard({ student, onDelete }) {
   return (
     <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg border-l-4 border-blue-500 flex flex-col justify-between relative transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:border-blue-600 w-full">
       <div className="transition-opacity duration-300 space-y-1">
         <h3 className="font-bold text-base sm:text-lg text-blue-700">{student.name}</h3>
         <p className="text-sm sm:text-base text-gray-700">{student.email}</p>
         <p className="text-xs sm:text-sm text-gray-600">Course: {student.course}</p>
       </div>
 
       <button
         onClick={() => onDelete(student.id)}
         className="absolute bottom-2 right-2 bg-red-500 text-white py-1 px-3 rounded-full text-xs font-semibold transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105"
       >
         Delete
       </button>
     </div>
   );
 }
 