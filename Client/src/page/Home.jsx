import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [studentFilter, setStudentFilter] = useState("All");
  const [AllCourse, setAllCourse] = useState([]);
  const [AllStudent, setAllStudent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    Name: "",
    Email: "",
    Phone: "",
    CourseTitle: "",
    Enrollment: "true", 
  });

  const [newCourse, setNewCourse] = useState({
    Title: "",
    Desciption: "",
    Status: "Open",
  });

  async function fetcourse() {
    try {
      const res = await axios.get("http://localhost:5050/api/course/all-course");
      setAllCourse(res.data.getallcourse);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function Allstudent() {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/student/getallstudent?Enrollment=${studentFilter}`
      );
      setAllStudent(res.data.students);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleAddStudent(e) {
    e.preventDefault();
    try {
      const payload = {
        ...newStudent,
        Enrollment: newStudent.Enrollment === "true" ? true : false,
      };
      await axios.post("http://localhost:5050/api/student/create-student", payload);
      setShowModal(false);
      setNewStudent({
        Name: "",
        Email: "",
        Phone: "",
        CourseTitle: "",
        Enrollment: "true", // ✅ reset safely
      });
      Allstudent();
    } catch (error) {
      console.error("Student creation failed:", error.message);
      alert("Failed to add student. Check console for details.");
    }
  }

  async function handleAddCourse(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/api/course/create-course", newCourse);
      setShowCourseModal(false);
      setNewCourse({ Title: "", Desciption: "", Status: "Open" });
      fetcourse();
    } catch (error) {
      console.error("Course creation failed:", error.message);
    }
  }

  async function handleDeleteCourse(id) {
    try {
      await axios.delete(`http://localhost:5050/api/course/remove-course/${id}`);
      fetcourse();
    } catch (error) {
      console.error("Failed to delete course:", error.message);
    }
  }

  useEffect(() => {
    fetcourse();
    Allstudent();
  }, [studentFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6">
      <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10 tracking-tight">
        📚 Course Enrollment App
      </h1>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-bold mb-4 text-orange-600">Add New Student</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.Name}
                onChange={(e) => setNewStudent({ ...newStudent, Name: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.Email}
                onChange={(e) => setNewStudent({ ...newStudent, Email: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newStudent.Phone}
                onChange={(e) => setNewStudent({ ...newStudent, Phone: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <select
                value={newStudent.CourseTitle}
                onChange={(e) => setNewStudent({ ...newStudent, CourseTitle: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              >
                <option value="">Select Course</option>
                {AllCourse.filter(course => course.Status === "Open").map((course, idx) => (
                  <option key={idx} value={course.Title}>{course.Title}</option>
                ))}
              </select>
              <select
                value={newStudent.Enrollment}
                onChange={(e) => setNewStudent({ ...newStudent, Enrollment: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              >
                <option value="true">Enrolled</option>
                <option value="false">Not Enrolled</option>
              </select>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Course</h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={newCourse.Title}
                onChange={(e) => setNewCourse({ ...newCourse, Title: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <textarea
                placeholder="Description"
                value={newCourse.Desciption}
                onChange={(e) => setNewCourse({ ...newCourse, Desciption: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <select
                value={newCourse.Status}
                onChange={(e) => setNewCourse({ ...newCourse, Status: e.target.value })}
                className="w-full border px-4 py-2 rounded-md"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Courses Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="w-full table-auto text-sm border">
            <thead className="bg-orange-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {AllCourse.map((course, i) => (
              
                <tr key={i} className="border-t hover:bg-orange-50 cursor-pointer">
                    
                <Link to={`/description/${course._id}`}><td className="py-2 px-4">{course.Title}</td></Link>
                  <td className="py-2 px-4">{course.Desciption}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.Status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{course.Status}</span>
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleDeleteCourse(course._id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                  </td>
                </tr>
             
              ))}
            </tbody>
          </table>
        </div>

        {/* Students Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Students</h2>
            <div className="flex gap-2">
              <select
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="All">All</option>
                <option value="true">Enrolled</option>
                <option value="false">Not Enrolled</option>
              </select>
              <button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm">+ Add Student</button>
              <button onClick={() => setShowCourseModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">+ Add Course</button>
            </div>
          </div>
          <table className="w-full table-auto text-sm border">
            <thead className="bg-orange-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Course</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {AllStudent.map((stu, i) => (
                <tr key={i} className="border-t hover:bg-orange-50">
                  <td className="py-2 px-4">{stu.Name}</td>
                  <td className="py-2 px-4">{stu.Email}</td>
                  <td className="py-2 px-4">{stu.Phone}</td>
                  <td className="py-2 px-4">{stu.CourseTitle}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stu.Enrollment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{stu.Enrollment ? "Enrolled" : "Not Enrolled"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
