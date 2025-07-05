const express = require("express");
const studentcontroller = require("../Controller/Student.controller");




let StudentRoutes = express.Router();
StudentRoutes.post("/create-student", studentcontroller.create);
StudentRoutes.get("/getstudent-course/:cid",studentcontroller.getstudent);
StudentRoutes.get("/getallstudent",studentcontroller.getallstudent);

module.exports = StudentRoutes;