import { SYSTEM_URL } from '@env';


exports.generateVerifyOTP = {
    generateOTP : SYSTEM_URL+"/v1/GetOtp",
    verifyOTP : SYSTEM_URL+"/v1/verifyOtp",
    login : SYSTEM_URL+"/v1/login",
    DecodedApi:SYSTEM_URL+"/v1/DecodToken",
}

exports.SignupRoute={
    signup:SYSTEM_URL+"/v1/signup"
}

exports.Profile={
    profileInfo:SYSTEM_URL+"/v1/FindByEmail" ,  
    UpdateProfile:SYSTEM_URL+"/v1/updateProfile",
    DeleteProfile:SYSTEM_URL+"/v1/deleteProfile",
    updatepassword:SYSTEM_URL+"/v1/updatePassword"
}
exports.projectsRoute={
    projectByName : SYSTEM_URL+"/v1/projects/findProjectByProjectName",
    createProject:SYSTEM_URL+"/v1/projects/addProject",
    project: SYSTEM_URL+"/v1/projects/findProjects",
    projectById : SYSTEM_URL+"/v1/projects/findProjectById",
    updatedProject : SYSTEM_URL+"/v1/projects/updatedProject",
}

exports.savedProjectRoute = {
    getSavedProject: SYSTEM_URL+"/v1/getSavedProject",
    getRecentProject: SYSTEM_URL+"/v1/getRecentProject",
    addSavedProject: SYSTEM_URL+"/v1/addSavedProject",
    RemoveSavedProject:SYSTEM_URL+"/v1/removeSavedProject"
}

exports.AlertRoute={
    RecentAlert:SYSTEM_URL+"/v1/alert/GetRecentAlert",
    Recent10Alert:SYSTEM_URL+"/v1/alert/getRecentAlertsByProfileId"
}