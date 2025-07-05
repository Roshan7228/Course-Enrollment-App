const CourseModel = require("../Model/Course.Model");

let CourseController = {
    create: async (request, response) => {
        let { Title, Desciption, Status } = request.body;

        if (!Title || !Desciption || !Status) {
            return response.status(400).json({
                message: "Please Fill the Feilds",
            });
        }
        try {
            let Createcourse = await CourseModel.create({ Title, Desciption, Status });
            return response.status(201).json({
                message: "Course Created",
                Createcourse,
            });
        } catch (error) {
            return response.status(500).json({
                message: error.message,
            });
        }
    },
    getallcourse: async (request, response) => {
        try {
            let getallcourse = await CourseModel.find();

            if (!getallcourse) {
                return response.status(400).json({
                    message: "Not Found"
                })
            }
            return response.status(200).json({
                message: "All Course",
                getallcourse
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    },
    removecourse: async (request, response) => {
        let { cid } = request.params;
        if (!cid) {
            return response.status(400).json({
                message: "Somethink went Wrong"
            })
        }
        try {
        let RemoveCourse=await CourseModel.findByIdAndDelete(cid);
        if(!RemoveCourse){
           return response.status(400).json({
            message:"Not Found"
           })
        }
        return response.status(200).json({
            message:"Remove Successfull"
        })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }
};

module.exports = CourseController;
