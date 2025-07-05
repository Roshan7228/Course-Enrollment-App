require("dotenv").config();
const mongooes=require("mongoose");
let Mongodb_Connection=mongooes.connect(process.env.Mongodb_Url);

module.exports=Mongodb_Connection;

