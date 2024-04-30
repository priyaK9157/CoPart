const mongoose=require("mongoose");

require("dotenv").config();
exports.dbConnect=()=>{
       mongoose.connect(process.env.Mongo_Url,{
       })
        .then(console.log("db connection sucesss"))
        .catch((err)=>{
            console.log("error in connecting db");
            console.log(err);
            process.exit(1);
        })
}