exports.generateVerifyOTP = {
    generateOTP : "http://192.168.160.191:4000/v1/getOtp",
    verifyOTP : "http://192.168.160.191:4000/v1/verifyOtp",
    login : "http://192.168.160.191:4000/v1/login",
    DecodedApi:"http://192.168.160.191:4000/v1/DecodToken",
    generateOTP : "https://192.168.160.191:4000/v1/getOtp",
    verifyOTP : "https://192.168.160.191:4000/v1/verifyOtp",
    login : "https://192.168.160.191:4000/v1/login",
    DecodedApi:"https://192.168.160.191:4000/v1/DecodToken"

}

exports.SignupRoute={
    signup:"http://192.168.160.191:4000/v1/signup"
}

exports.Profile={
    profileInfo:"http://192.168.160.191:4000/v1/FindByEmail"
}
exports.projectsRoute={
    projectByName : "http://192.168.160.191:4000/v1/projects/findProjectByProjectName",
    createProject:"http://192.168.160.191:4000/v1/projects/addProject",
    project: "http://192.168.160.191:4000/v1/projects/findProjects",
    projectByName : "http://192.168.160.191:4000/v1/projects/findProjectByProjectName",
    createProject:"https://192.168.160.191:4000/v1/projects/addProject",
    project: "https://192.168.160.191:4000/v1/projects/findProjects",
    projectByName : "https://192.168.160.191:4000/v1/projects/findProjectByProjectName"
}

exports.savedProjectRoute = {
    getSavedProject: "http://192.168.160.191:4000/v1/getSavedProject",
    getRecentProject: "http://192.168.160.191:4000/v1/getRecentProject",
    addSavedProject: "http://192.168.160.191:4000/v1/addSavedProject",
    RemoveSavedProject:"http://192.168.160.191:4000/v1/removeSavedProject",
    getSavedProject: "https://192.168.160.191:4000/v1/getSavedProject",
    getRecentProject: "https://192.168.160.191:4000/v1/getRecentProject",
    addSavedProject: "https://192.168.160.191:4000/v1/addSavedProject",
    RemoveSavedProject:"https://192.168.160.191:4000/v1/removeSavedProject"
}