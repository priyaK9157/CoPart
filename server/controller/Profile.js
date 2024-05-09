const Profile = require("../Models/Profile");
const Project = require("../Models/Project");
const User = require("../Models/User");
const bcrypt = require('bcrypt');

// update profile
exports.updateProfile=async(req,res)=>{
     try{
     const {data}=req.body;
     console.log("data", data);
     console.log("update k andar aya ki nhi", data.Email)
     console.log("Professional_Role",data.Professional_Role)

   //   const userProfile = await Profile.findOne({Email:data.Email})

   //   console.log("userProfile",userProfile)
      
      const Profiles=await Profile.findOneAndUpdate({Email:data.Email},{
        name: data.name,
        Email:data.Email,
        Professional_Role: data.Professional_Role,
        User_Bio: data.User_Bio,
        TechStack: data.TechStack,
        GithubLink: data.GithubLink,
        LinkedIn: data.LinkedIn,
        SavedJobs: data.SavedJobs
      },{new:true})

      console.log("Profiles",Profiles)

      return res.status(200).json({
        success:true,
        message:"Profile Update SuccessFully",
        profile:Profiles
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

//update password
exports.updatePassword=async(req,res)=>{
    try{
       const{newPassword,Email}=req.body;
       console.log("req",req.body)
       const hashedPassword = await bcrypt.hash(newPassword, 10);
       const user_Profile = await Profile.findOneAndUpdate(
        { Email }, 
        { $set: { password: hashedPassword } },
        { new: true } 
      );
      console.log("user",user_Profile)
      return res.status(200).json({
        success:true,
        message:"Password Update SuccessFully",
        user_Profile
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
   console.log("first")
    try{
      console.log("find email k andar")
       const {Email} =req.body
       
       const response=await Profile.findOne({Email:Email}).populate("SavedJobs").exec();
       return res.status(200).json({response})
    } catch(error){
      return res.status(404).json({
         success:false,
         error:error
      })
    }
}
