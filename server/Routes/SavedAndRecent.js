const express = require("express");
const router = express.Router()

const {getSavedProject, addSavedProject, getRecentProject,removeSavedProject} = require("../controller/SavedAndRecentProject");
const { Auth } = require("../controller/Auth");

router.get("/getRecentProject", Auth,getRecentProject);
router.post("/addSavedProject", addSavedProject);
router.post("/getSavedProject", getSavedProject);
router.post("/removeSavedProject",Auth,removeSavedProject)

module.exports=router