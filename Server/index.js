
const express=require("express");
const Mongodb_Connection = require("./Config/db");
const CourseRoutes = require("./Routes/Course.routes");
const StudentRoutes = require("./Routes/Student.routes");
require("dotenv").config();



let app=express();

app.use(express.json());


app.use("/api/course",CourseRoutes);
app.use("/api/student",StudentRoutes);


app.listen(process.env.base_Port,async()=>{
    try {
        await Mongodb_Connection;
        console.log(`Server Running on  Port ${process.env.base_Port}`);
    } catch (error) {
         console.log(error)
    }
})

