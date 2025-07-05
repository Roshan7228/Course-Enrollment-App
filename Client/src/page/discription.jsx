import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Description() {
  const { pid } = useParams();
  const [allStudents, setAllStudents] = useState([]);
  const [course, setCourse] = useState(null);

  async function fetchCourseAndStudents() {
    try {
      const res = await axios.get(`http://localhost:5050/api/course/description/${pid}`);
      setCourse(res.data.course);
    } catch (error) {
      console.log("Course Fetch Error:", error.message);
    }
  }

  async function fetchStudents() {
    try {
      const res = await axios.get(`http://localhost:5050/api/student/getstudent-course/${pid}`);
      setAllStudents(res.data.students);
    } catch (error) {
      console.log("Student Fetch Error:", error.message);
    }
  }

  useEffect(() => {
    fetchCourseAndStudents();
    fetchStudents();
  }, [pid]);

  if (!course) {
    return <div className="text-center mt-10 text-gray-600">Loading course details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Course Details</h2>

      <p className="mb-2">
        <span className="font-semibold">Title:</span> {course.Title}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Description:</span> {course.Desciption}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            course.Status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {course.Status}
        </span>
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          👨‍🎓 Students ({allStudents.length})
        </h3>

        {allStudents.length === 0 ? (
          <p className="text-gray-500 text-sm">No students added yet.</p>
        ) : (
          <table className="w-full mt-4 border text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Enrollment</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((stu, i) => (
                <tr key={stu._id} className="border-t hover:bg-blue-50">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{stu.Name}</td>
                  <td className="py-2 px-4">{stu.Email}</td>
                  <td className="py-2 px-4">{stu.Phone}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        stu.Enrollment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stu.Enrollment ? "Enrolled" : "Not Enrolled"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Description;
