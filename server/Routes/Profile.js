const express=require("express");
const router=express.Router();

// importing controller
const{DeleteProfile,updateProfile,FindByEmail,updatePassword}=require("../controller/Profile");
const {Auth} = require("../controller/Auth")


router.delete("/deleteProfile",Auth,DeleteProfile);
router.put("/updateProfile",updateProfile);
router.post("/FindByEmail",Auth,FindByEmail)
router.post("/updatePassword",Auth,updatePassword)


module.exports=router