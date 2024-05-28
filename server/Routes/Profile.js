const express=require("express");
const router=express.Router();

// importing controller
const{DeleteProfile,updateProfile,FindByEmail,updatePassword, updateProfilePicture, updateResume}=require("../controller/Profile");



router.post("/deleteProfile",DeleteProfile);
router.put("/updateProfile",updateProfile);
router.post("/FindByEmail",FindByEmail)
router.post("/updatePassword",updatePassword)
router.put("/updateProfilePicture",updateProfilePicture)
router.put("/updateResume",updateResume)


module.exports=router