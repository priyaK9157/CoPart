const express=require("express");
const router=express.Router();

// importing controller
const{GetOtp,signup,login,verifyOtp}=require("../controller/Users")

router.post("/GetOtp",GetOtp);
router.post("/signup", signup);
router.post("/login",login)
router.post("/VerifyOtp",verifyOtp);





module.exports=router