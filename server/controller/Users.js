const User = require("../Models/User");
const Profile = require("../Models/Profile");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const Otp =require("../Models/Otp")
const otpTemplate=require("../Template/MailVerification.js")
const nodemailerSender=require("../Utils/MailSender.js")
// genrate a unique otp

exports.GetOtp = async (req, res) => {
  
  try {
    const { Email } = req.body;
    console.log("Email",Email)
    // Check if the email is provided
    if (!Email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if the profile with the provided email exists
    const userProfile = await Profile.findOne({ Email });
    console.log("user",userProfile)
    if (userProfile) {
      return res.status(200).json({
        success: false,
        message: "Profile found",
      });
    }

    // Generate a random OTP (4 digits for simplicity)
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
      
    // Store the OTP in the database (you may need a separate OTP model)
    const otpDocument = new Otp({
      Email: Email,
      otp: generatedOtp,
    });

    await otpDocument.save();
      console.log("otp",otpDocument)
    // sending mail in email
    const sendingMail=await nodemailerSender(Email,"Email Verification Code",otpTemplate(generatedOtp))
    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp: generatedOtp,
    });
  } catch (error) {
    console.error("Error in GetOtp controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    
     const { Email, user_Otp } = req.body;
     const OtpModel = await Otp.findOne({ Email: Email }).sort({ createdAt: -1 }).exec();
     if (!OtpModel) {
        return res.status(404).json({
           success: false,
           message: "No OTP found for the provided email.",
        });
     }
     console.log("data", typeof( parseInt(user_Otp)),typeof(OtpModel.otp))
     if ( parseInt(user_Otp) !== OtpModel.otp) {
        return res.status(200).json({
           success: false,
           message: "OTP doesn't match.",
        });
     }
    console.log("done")
     return res.status(200).json({
        success: true,
        matched:true,
        message: "OTP matched successfully.",
     });
  } catch (error) {
     return res.status(500).json({
        success: false,
        message: "An error occurred.",
        error: error.message,
     });
  }
}


exports.signup = async (req, res) => {
  
  try {
    const {
      Full_Name,
      Tech,
      Email,
      GithubLink,
      LinkedinLink,
      password,
      proffesional_Role,
      user_Dec
    } = req.body;
    if (
      !Full_Name ||
      !proffesional_Role ||
      !user_Dec ||
      !Tech ||
      !Email ||
      
      !password
    ) {
      return res.status(400).json({
        message: "All Field are Required",
      });
    }
   

    const existingUser = await Profile.findOne({ Email: Email });
    if (existingUser !== null) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }
   
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //converting values
    const techArray = Object.values(req.body.Tech);
    // Create a new profile
    console.log("req",req.body,hashedPassword,techArray)
    const profile = await Profile.create({
      name: Full_Name,
      Email: Email,
      Professional_Role:proffesional_Role,
      User_Bio:user_Dec,
      LinkedIn:LinkedinLink,
      GithubLink:GithubLink,
      TechStack: techArray,
      password: hashedPassword,
      SavedJobs:[]
    });
 
    console.log("user",profile)
    const user = await User.create({
      profileInf: profile._id,
      Project: [],
    });


    
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      User: user,
    });
  } catch (error) {
    return res.json({
      message: "Error Occurred",
      error: error,
    });
  }
};

exports.login=async(req,res)=>{
  try{
    
      console.log("hello",req.body)
      const {email,password}=req.body;
      //validation
      if(!email || !password){
        return  res.status(401).json({
              success:false,
              message:"All Field Are Required Please Fill All The Detail",
          })
      }

      //db check if user exit or not
      const user=await Profile.findOne({Email:email})
      if(!user){
         return res.status(200).json({
              success:false,
              message:"Sign Up First",
          })}
          
          //jwt token
      if(await bcrypt.compare(password,user.password)){
          const payload={
              email:user.Email,
              id:user._id,
          }


          let token=jwt.sign(payload,process.env.JWT_SECRET,{
           
          });

          user.token=token;
          user.password=undefined;
          const option={
              expires: new Date(Date.now() + 3*24*60*60*1000),
              httpOnly:true,
          }
          res.cookie("token",token,option).status(200).json({
              success:true,
               token,
               user,
               message:"Log In SuccessFully",
          })
      }
      else{
              return res.status(200).json({
                  success:false,
                  message:"password Doesn't Matches",
               })
      }

  } catch(err){
      console.log(err);
      return res.status(500).json({
          success:false,
          message:'Login Failure, please try again',
      });
  }
}

