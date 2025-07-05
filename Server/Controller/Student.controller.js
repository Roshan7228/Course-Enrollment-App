const CourseModel = require("../Model/Course.Model");
const StudentModel = require("../Model/Student.Model");

const studentcontroller = {
    create: async (request, response) => {
        const { Name, Email, Phone, CourseTitle, Enrollment } = request.body;
        if (!Name || !Email || !Phone || !CourseTitle) {
            return response.status(400).json({ message: "Please fill all fields" });
        }
        try {
            const course = await CourseModel.findOne({ Title: CourseTitle });

            if (!course) {
                return response.status(404).json({ message: "Course not found" });
            }

            if (Enrollment === true) {
                const student = await StudentModel.create({
                    Name,
                    Email,
                    Phone,
                    Course_id: course._id.toString(),
                    Enrollment
                });
                course.enrolledStudents.push({ Enrollment_id: student._id });
                await course.save();
                return response.status(201).json({
                    message: "Student created & enrolled successfully",
                    student
                });
            }
            else {
                const student = await StudentModel.create({
                    Name,
                    Email,
                    Phone,
                    Enrollment
                });
                return response.status(201).json({
                    message: "Student created but not enrolled",
                    student
                });

            }

        } catch (error) {
            return response.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    },
    getstudent: async (request, response) => {
        const { cid } = request.params;
        if (!cid) {
            return response.status(400).json({
                message: "Something went wrong"
            });
        }
        try {
            const students = await StudentModel.find({ Course_id: cid });
            if (!students) {
                return response.status(404).json({
                    message: "No student found for this course"
                });
            }
            return response.status(200).json({
                message: "Students fetched successfully",
                students
            });
        } catch (error) {
            return response.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    },
    getallstudent: async (request, response) => {
        try {
            const { Enrollment } = request.query;
            const filter = {};
            if (Enrollment === "true") {
                filter.Enrollment = true;
            } else if (Enrollment === "false") {
                filter.Enrollment = false;
            }
            const students = await StudentModel.find(filter);
            if (!students || students.length === 0) {
                return response.status(404).json({
                    message: "No students found"
                });
            }
            return response.status(200).json({
                message: "Students fetched successfully",
                students
            });
        } catch (error) {
            return response.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    }


};

module.exports = studentcontroller;
