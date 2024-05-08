const express=require("express");
const router=express.Router();

// importing controller
const{DeleteProfile,updateProfile,FindByEmail,updatePassword}=require("../controller/Profile");


router.delete("/deleteProfile",DeleteProfile);
router.put("/updateProfile",updateProfile);
router.post("/FindByEmail",FindByEmail)
router.post("/updatePassword",updatePassword)


module.exports=router