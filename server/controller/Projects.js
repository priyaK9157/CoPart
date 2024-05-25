const Project = require("../Models/Project");
const User = require("../Models/User");
const Profile = require("../Models/Profile")
  

// Get projects based on search criteria
async  function findProjects(req, res){
  try {

    const response=await Project.find({}).populate('profileId');
      console.log("res",response)
    return res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects: response, 
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
};


async function findProjectByProjectName(req,res){
  try{
    const {projectName} = req.body;
    console.log("proh",projectName)
    const response = await Project.findOne({projectName:projectName});
    
    return res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects: response, 
    });
  }catch (error) {
    return res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
}

async function updatedProject (req, res)  {
    try {
      const { projectId } = req.body;
  
      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Find the project by ID
      const existingProject = await Project.findById(projectId);
  
      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      // Update project details
      existingProject.projectName = projectName;
      existingProject.projectDescription = projectDescription;
  
      // Save the updated project
      const updatedProject = await existingProject.save();
  
      return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occurred",
        error: error.message,
      });
    }
  };
  
  // Delete project
async function deleteProject(req, res) {
    try {
      const { projectId } = req.params;
     
      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required",
        });
      }
  
      // Find the project by ID
      const existingProject = await Project.findById(projectId);
  
      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // Remove the project ID from the user's projects array
      User.projects = User.projects.filter((id) => id !== existingProject._id);
      await User.save();
  
      // Delete the project
      await existingProject.remove();
  
      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occurred",
        error: error.message,
      });
    }
  };

// List projects
async function list(_criteria) {
  try {
    let query = Project.query();

    if (_criteria.commonSearch) {
      query = query.where('project', 'LIKE', `%${_criteria.commonSearch}%`);
    }

    if (_criteria.sortOption === 'latest_to_old') {
      query = query.orderBy('created_at', 'desc');
    } else if (_criteria.sortOption === 'old_to_latest') {
      query = query.orderBy('created_at', 'asc');
    } else {
      query = query.orderBy('created_at', 'desc');
    }

    const projects = await query.paginate(_criteria.page || 1, _criteria.perPage || 10);

    return {
      success: true,
      message: 'Projects listed successfully.',
      data: projects,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: 'Failed to fetch projects.',
      error: error.message,
    };
  }
}

// Assuming you have the necessary imports and setup

async function AddProject(req, res){
  try {
    const {Email, projectName, projectDescription,Skill,BasicDetail } = req.body;
    if (!Email || !Skill || !projectName || !projectDescription || !BasicDetail) {
      return res.status(400).json({
        message: "Email, projectName, and projectDescription are required",
      });
    }

    // Find the user by email
    const profile = await Profile.findOne({ Email: Email });

    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // Create a new project
    const newProject = await Project.create({
      profileId: profile._id,
      projectName: projectName,
      projectDescription: projectDescription,
      Skill: Skill,
      BasicDetail: BasicDetail,
    });

    const user = await User.findOne({
      profileInf: newProject.profileId
    })

    user.Project = user.Project || [];

    // Update the user's projects array with the new project ID
    user.Project.push(newProject._id);
    await user.save();
    // create alert message
    await Alert.create({
      ProfileId:profile._id,
      message:"Congratulations! 🚀 Your project has been created successfully! 🎉",
      type:"info"
    })
    return res.status(200).json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
};


async function findProjectById(req,res) {
  try {
    const {id} = req.body
  
    const response = await Project.findById(id).populate('profileId').exec();;
      console.log("res",response)

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      project: response 
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message
    });
  }
}

async function AppliedProject(req, res) {
  try {
    const { email, projectid } = req.body;
   
    // Find the profile by email
    const profile = await Profile.findOne({ Email: email });
    console.log("email",email,projectid)
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

     // Check if project is already applied to
     const matchesProject = profile.AppliedProject.includes(projectid);
     if (matchesProject) {
         return res.status(200).json({
             success: false,
             message: "Project already applied"
         });
     }
     // check edge case if user create the project
     const ProjectInfo=await Project.findById(projectid);

      // Check if the project creator is the same as the user applying for it
      
    if (ProjectInfo.profileId.equals(profile._id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to a project you've created."
      });
    }


    // Add the project id to the AppliedProject array
    profile.AppliedProject.push(projectid);

    // Save the updated profile
    await profile.save();
  
    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Project applied successfully"
    });
  } catch (error) {
    console.error('Error applying project:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Export the function
module.exports = {
  list,
  AppliedProject,
  updatedProject,
  findProjects,
  deleteProject,
  AddProject,
  findProjectByProjectName,
  findProjectById
};




  

