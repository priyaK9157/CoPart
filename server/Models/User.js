const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
     profileInf:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile',
     },
     Project:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
     }],
     
    
})

module.exports=mongoose.model("User",UserSchema)