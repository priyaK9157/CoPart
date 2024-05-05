const Profile = require("../Models/Profile");
const Project = require("../Models/Project");
const User = require("../Models/User");

// update profile
exports.updateProfile=async(req,res)=>{
     try{
     const{Email,CurrentYear,TechStack}=req.body
      if(!Email || !CurrentYear || !TechStack){
         return res.status(400).json({
            success:false,
            message:"All Field Are Required"
         })
      }
      // user find
      const userProfile=await Profile.findOne({Email:Email});
      const Profile=await Profile.findByIdAndUpdate(userProfile._id,{
        CurrentYear:CurrentYear,
        TechStack:TechStack
      })

      return res.status(200).json({
        success:true,
        message:"Profile Update SuccessFully",
        profile:Profile
      })
     } catch(error){
        return res.status(400).json({
            message: "Error Occurred",
            error: error,
          });
     }
}

// delete profile
exports.DeleteProfile=async(req,res)=>{
    try{
    const{Email}=req.body
     if(!Email){
        return res.status(400).json({
           success:false,
           message:"All Field Are Required"
        })
     }

     // Profile  find
     const userProfile=await Profile.findOne({Email:Email});
    // user find
    const userData=await User.findOne({profileInf:userProfile._id});
    //project find
    const ProjectData=await Project.findOne({userId:userData._id});

    // deleteing three
    if(userProfile && userData && ProjectData){
        await Profile.deleteOne({Email:Email});
        await Project.deleteOne({userId:userData._id});
        await User.deleteOne({profileInf:userProfile._id})
    }
    
    

     return res.status(200).json({
       success:true,
       message:"Profile Will  Delete in 30 Days "
     })
    } catch(error){
       return res.status(400).json({
           message: "Error Occurred",
           error: error,
         });
    }
}

// find by id
exports.FindByEmail=async(req,res)=>{
    try{
       const {Email} =req.body
       console.log("email", Email)
       const response=await Profile.findOne({Email:Email}).populate("SavedJobs").exec();
       return res.status(200).json({response})
    } catch(error){
      return res.status(404).json({
         success:false,
         error:error
      })
    }
}