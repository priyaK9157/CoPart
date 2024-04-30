const express = require('express');
const router = express.Router();
const projectController = require('../controller/Projects');

router.get('/projects/findProjects', projectController.findProjects);

router.post('/projects/findProjectByProjectName', projectController.findProjectByProjectName);

router.put('/projects/updateProject', projectController.updatedProject);

router.delete('/projects/deleteProject/:projectId', projectController.deleteProject);

router.get('/projects/listProjects', projectController.list);

router.post('/projects/addProject', projectController.AddProject);

module.exports = router;

