const express=require("express");
const CourseController = require("../Controller/Course.controller");




let CourseRoutes=express.Router();


CourseRoutes.post("/create-course",CourseController.create);
CourseRoutes.get("/all-course",CourseController.getallcourse);
CourseRoutes.delete("/remove-course/:cid",CourseController.removecourse);





module.exports=CourseRoutes;