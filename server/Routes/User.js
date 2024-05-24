const express=require("express");
const router=express.Router();

// importing controller
const{GetOtp,signup,login,verifyOtp, GetToken}=require("../controller/Users")

router.post("/GetOtp",GetOtp);
router.post("/signup", signup);
router.post("/login",login)
router.post("/VerifyOtp",verifyOtp);
router.post("/GetToken",GetToken);





module.exports=router