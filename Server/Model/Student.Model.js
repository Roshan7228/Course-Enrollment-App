const mongoose = require("mongoose");

let StudentSchema = new mongoose.Schema({
    Course_id: {
        type: String
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: Number,
        required: true
    },
    Enrollment:{
        type:Boolean,
        default:false
    }
});

let StudentModel=mongoose.model("Student",StudentSchema);

module.exports=StudentModel;
