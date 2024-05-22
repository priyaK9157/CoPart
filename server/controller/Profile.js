const Profile = require("../Models/Profile");
const Project = require("../Models/Project");
const User = require("../Models/User");
const bcrypt=require("bcrypt")

// update profile
exports.updateProfile = async (req, res) => {
  try {
    const { data } = req.body;
    const profileData = await Profile.findOne({ Email: data.Email });

    // Create an object to store updated profile data
    const updatedProfileData = {};

    // Check each field in the request body and update if it exists
    if (data.name) updatedProfileData.name = data.name;
    if (data.Professional_Role) updatedProfileData.Professional_Role = data.Professional_Role;
    if (data.User_Bio) updatedProfileData.User_Bio = data.User_Bio;
    if (data.TechStack) updatedProfileData.TechStack = data.TechStack;
    if (data.GithubLink) updatedProfileData.GithubLink = data.GithubLink;
    if (data.LinkedIn) updatedProfileData.LinkedIn = data.LinkedIn;
    if (data.SavedJobs) updatedProfileData.SavedJobs = data.SavedJobs;

    // Find and update the profile with new data
    const updatedProfile = await Profile.findOneAndUpdate(
      { Email: data.Email },
      updatedProfileData,
      { new: true }
    );

    console.log("Updated Profile:", updatedProfile);

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profile: updatedProfile
    });
  }  catch(error){
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
       const{Email,newPassword}=req.body;
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
    try{
       const {Email} =req.body
       const response=await Profile.findOne({Email:Email}).populate("SavedJobs").populate("AppliedProject").exec();
       return res.status(200).json({response})
    } catch(error){
      return res.status(404).json({
         success:false,
         error:error
      })
    }
}
