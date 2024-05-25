const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    ProfileImage:{
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Education:{
        type: String,
        required: true
    },
    Experience : {
        type: String,
        required: true
    },
    PersonalWebsite : {
        type: String,
        required: true
    },
    Professional_Role: {
        type: String,
        required: true
    },
    User_Bio: {
        type: String,
        required: true
    },
    TechStack: {
        type: Array,
        required: true
    },
    GithubLink: {
        type: String,
    },
    LinkedIn: {
        type: String,
    },
    SavedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
    }],
    AppliedProject:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
    }],
    Alerts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alert', 
    }],
    Location:{
         type:String,
         required:true
    },
    Resume:{
        type:String,
    },
    Gender:{
        type:String,
    }
    
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
