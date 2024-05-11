import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import professionalRoleReducer from './professionalRole';
import CreateProject from './CreateProject';
import ButtonSlices from './ButtonSlices';
import Updatepassword from './Updatepassword';
import SearchData from './SearchData';
import LinkReducer from './LinkReducer' 

const rootReducer = combineReducers({
  signup: signupReducer,
  professionalRole: professionalRoleReducer,
  createProject:CreateProject,
  buttonSlices:ButtonSlices,
  updatepassword:Updatepassword,
  SearchData:SearchData,
  Links: LinkReducer

});

export default rootReducer;
