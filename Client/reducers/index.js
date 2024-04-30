import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import professionalRoleReducer from './professionalRole';
import CreateProject from './CreateProject';
import ButtonSlices from './ButtonSlices';

const rootReducer = combineReducers({
  signup: signupReducer,
  professionalRole: professionalRoleReducer,
  createProject:CreateProject,
  buttonSlices:ButtonSlices
});

export default rootReducer;
