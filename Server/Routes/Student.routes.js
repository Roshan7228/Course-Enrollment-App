const express = require("express");
const studentcontroller = require("../Controller/Student.controller");




let StudentRoutes = express.Router();
StudentRoutes.post("/create-student/:cid", studentcontroller.create);
                    

module.exports = StudentRoutes;