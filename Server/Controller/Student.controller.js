const CourseModel = require("../Model/Course.Model");
const StudentModel = require("../Model/Student.Model");

let studentcontroller = {
    create: async (req, res) => {
        const { cid } = req.params;
        const { Name, Email, Phone } = req.body;
        if (!Name || !Email || !Phone) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        try {
            const course = await CourseModel.findById(cid);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            const student = await StudentModel.create({
                Name,
                Email,
                Phone,
                Course_id: cid
            });
            course.enrolledStudents.push({ Enrollment_id: student._id.toString() });
            await course.save();
            return res.status(201).json({
                message: "Student enrolled successfully",
                student
            });

        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
};

module.exports = studentcontroller;
