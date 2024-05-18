// projectModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  profileId: 
  { type: Schema.Types.ObjectId, 
    ref: 'Profile', 
    required: true 
  },
  projectName: 
  { type: String,
    required: true
  },
  projectDescription: 
  { type: String,
   required: true 
  },
  Skill: 
  { type: Array, 
    required: true 
  },
  BasicDetail:
  {type:Object,
    required:true
  },
  Category:{
      type:String,
      required:true
  },
  createdAt: {
    type: Date,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
