import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import professionalRoleReducer from './professionalRole';
import CreateProject from './CreateProject';
import ButtonSlices from './ButtonSlices';
import Updatepassword from './Updatepassword';

const rootReducer = combineReducers({
  signup: signupReducer,
  professionalRole: professionalRoleReducer,
  createProject:CreateProject,
  buttonSlices:ButtonSlices,
  updatepassword:Updatepassword
});

export default rootReducer;
