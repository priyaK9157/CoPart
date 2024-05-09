

exports.generateVerifyOTP = {
    generateOTP : "http://192.168.160.191:4000/v1/GetOtp",
    verifyOTP : "http://192.168.160.191:4000/v1/verifyOtp",
    login : "http://192.168.160.191:4000/v1/login",
    DecodedApi:"http://192.168.160.191:4000/v1/DecodToken",

}

exports.SignupRoute={
    signup:"http://192.168.160.191:4000/v1/signup"
}

exports.Profile={
    profileInfo:"http://192.168.160.191:4000/v1/FindByEmail" ,  
    UpdateProfile:"http://192.168.160.191:4000/v1/updateProfile",
    DeleteProfile:"http://192.168.160.191:4000/v1/deleteProfile",
    updatepassword:"http://192.168.160.191:4000/v1/updatePassword"
}
exports.projectsRoute={
    projectByName : "http://192.168.160.191:4000/v1/projects/findProjectByProjectName",
    createProject:"http://192.168.160.191:4000/v1/projects/addProject",
    project: "http://192.168.160.191:4000/v1/projects/findProjects",
    projectById : "http://192.168.160.191:4000/v1/projects/findProjectById",
    updatedProject : "http://192.168.160.191:4000/v1/projects/updatedProject",
}

exports.savedProjectRoute = {
    getSavedProject: "http://192.168.160.191:4000/v1/getSavedProject",
    getRecentProject: "http://192.168.160.191:4000/v1/getRecentProject",
    addSavedProject: "http://192.168.160.191:4000/v1/addSavedProject",
    RemoveSavedProject:"http://192.168.160.191:4000/v1/removeSavedProject"
}

exports.AlertRoute={
    RecentAlert:"http://192.168.160.191:4000/v1/alert/GetRecentAlert",
    Recent10Alert:"http://192.168.160.191:4000/v1/alert/getRecentAlertsByProfileId"
}