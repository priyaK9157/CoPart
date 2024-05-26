const express = require("express");
const router = express.Router()

const {getSavedProject, addSavedProject, getRecentProject,removeSavedProject} = require("../controller/SavedAndRecentProject");


router.get("/getRecentProject",getRecentProject);
router.post("/addSavedProject",addSavedProject);
router.post("/getSavedProject", getSavedProject);
router.post("/removeSavedProject",removeSavedProject)

module.exports=router