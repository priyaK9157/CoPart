const express=require("express");
const router=express.Router();

// importing controller
const{GetOtp,signup,login,verifyOtp}=require("../controller/Users")
const{DecodeToken}=require("../controller/DecodeToken");


router.post("/GetOtp",GetOtp);
router.post("/signup", signup);
router.post("/login",login)
router.post("/VerifyOtp",verifyOtp);
router.post("/DecodToken",DecodeToken)




module.exports=router