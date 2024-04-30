const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Email: {
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
    password: {
        type: String,
        required: true
    },
    SavedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
    }]
    
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
