const express=require("express");
const router=express.Router();

// importing controller
const{DeleteProfile,updateProfile,FindByEmail,updatePassword, updateProfilePicture, updateResume}=require("../controller/Profile");
const {Auth} = require("../controller/Auth")


router.delete("/deleteProfile",Auth,DeleteProfile);
router.put("/updateProfile",Auth,updateProfile);
router.post("/FindByEmail",Auth,FindByEmail)
router.post("/updatePassword",Auth,updatePassword)
router.put("/updateProfilePicture",Auth,updateProfilePicture)
router.put("/updateResume",Auth,updateResume)


module.exports=router