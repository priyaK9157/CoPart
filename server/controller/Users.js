const User = require("../Models/User");
const Profile = require("../Models/Profile");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const Otp =require("../Models/Otp")
const otpTemplate=require("../Template/MailVerification.js")
const nodemailerSender=require("../Utils/MailSender.js");
const Alert = require("../Models/Alert.js");
// genrate a unique otp

exports.GetOtp = async (req, res) => {
  
  try {
    const { Email,purpose } = req.body;
    console.log("pu",req.body)
    // Check if the email is provided
    if (!Email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if the profile with the provided email exists
  
    const userProfile = await Profile.findOne({ Email });
    if (userProfile && purpose=="SignIn") {
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
    // sending mail in email
    const sendingMail=await nodemailerSender(Email,"Email Verification Code",otpTemplate(generatedOtp))
    console.log("send",sendingMail)
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
     if ( parseInt(user_Otp) !== OtpModel.otp) {
        return res.status(200).json({
           success: false,
           message: "OTP doesn't match.",
        });
     }
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
      proffesional_Role,
      user_Desc,
      country
    } = req.body;
    console.log("req",req.body)
    if (
      !Full_Name ||
      !proffesional_Role ||
      !user_Desc ||
      !Tech ||
      !Email  ||
      !country
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
   
    //converting values
    const techArray = Object.values(req.body.Tech);
    // create alert message
    const AlertData= await Alert.create({
      message:"Congratulations! 🎉 Your account has been created successfully. Welcome aboard! We're thrilled to have you join our community.",
      type:"info"
    })

    const avatar_url=`https://api.dicebear.com/5.x/initials/svg?seed=${Full_Name}`;

    // Create a new profile
    const profile = await Profile.create({
      ProfileImage:avatar_url,
      name: Full_Name,
      Email: Email,
      Education:"null",
      Experience:"null",
      PersonalWebsite:"null",
      Professional_Role:proffesional_Role,
      User_Bio:user_Desc,
      LinkedIn:LinkedinLink,
      GithubLink:GithubLink,
      TechStack: techArray,
      SavedJobs:[],
      Alerts:[AlertData._id],
      Location:country,
      Resume:"null",
      Gender:"null",
   
    });
 
   
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
    console.log("error",error)
    return res.json({
      message: "Error Occurred",
      error: error,
    });
  }
};

exports.GetToken=async(req,res)=>{
   const{email}=req.body;
   if(!email){
      return res.status(401).json({
        success: false,
        message: "All fields are required. Please Gave  all the details.",
      });
   }

    // Check if user exists in the database
    const userProfile = await Profile.findOne({ Email: email });
    if (!userProfile) {
      return res.status(200).json({
        success: false,
        message: "User does not exist. Please sign up first.",
      });
    }
    
    const payload = {
      email: userProfile.Email,

    };
     // Sign JWT token without expiration time
     let token = jwt.sign(payload, process.env.JWT_SECRET);

     return res.status(200).json({
          success:true,
          message:token
     })

}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required. Please fill in all the details.",
      });
    }

    // Check if user exists in the database
    const userProfile = await Profile.findOne({ Email: email });
    if (!userProfile) {
      return res.status(200).json({
        success: false,
        message: "User does not exist. Please sign up first.",
      });
    }

    // Verify password
    if (await bcrypt.compare(password, userProfile.password)) {
      const payload = {
        email: userProfile.Email,
        id: userProfile._id,
      };

      // Sign JWT token without expiration time
      let token = jwt.sign(payload, process.env.JWT_SECRET);

      // Create alert message
      const alertdata=await Alert.create({
        message:"Welcome back! 🌟 Your login was successful. If you didn't log in recently, please review your account activity. Your security is our priority!",
        type: "info",
      });
      
      // set alert
      userProfile.Alerts.push(alertdata._id);
      await userProfile.save();
      // Set cookie with the token
    
      const option = {
        httpOnly: true,
      };

      res.cookie("token", token, option).status(200).json({
        success: true,
        token,
        userProfile,
        message: "Login successful.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Password doesn't match.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login failure. Please try again.",
    });
  }
};


