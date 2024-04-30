const express=require("express");
const router=express.Router();

// importing controller
const{DeleteProfile,updateProfile,FindByEmail}=require("../controller/Profile");


router.delete("/deleteProfile",DeleteProfile);
router.put("/updateProfile",updateProfile);
router.post("/FindByEmail",FindByEmail)


module.exports=router