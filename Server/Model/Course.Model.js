const mongoose = require("mongoose");

let CourseSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Desciption: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    },
    enrolledStudents: {
        type: [
            {
                Enrollment_id: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", CourseSchema);
