import axios from "axios";

import { savedProjectRoute } from "../Api";

export const addSavedProject = async(email,_id) => {
    try{
        const response = await axios.post(savedProjectRoute.addSavedProject,{Email:email, projectId:_id});
        console.log("response of recent jobs", response);
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error.message);
    }
}

export const getSavedProject = async(email) => {
   
    try{
        const response = await axios.post(savedProjectRoute.getSavedProject, {Email:email});
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error.message);
    }
}

export const getRecentProject = async() => {
    try{
        const response = await axios.get(savedProjectRoute.getRecentProject);
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error.message);
    }
}

export const RemoveSavedProject = async(Email,ProjectId) => {
    try{
        const response = await axios.post(savedProjectRoute?.RemoveSavedProject,{Email,ProjectId});
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error.message);
    }
}