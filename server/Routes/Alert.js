const express = require("express");
const router = express.Router()

const{getRecentAlertsByProfileId,GetRecentAlert}=require("../controller/Alert")

router.post("/alert/getRecentAlertsByProfileId",getRecentAlertsByProfileId);
router.post("/alert/GetRecentAlert",GetRecentAlert)

module.exports=router