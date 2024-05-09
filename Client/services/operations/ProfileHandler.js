import axios from 'axios';
import {Profile} from '../Api';

exports.FindByEmail = async (email) => {
    console.log("pregnant",email)
    try{
        const response = await axios.post(Profile.profileInfo, {Email:email});
        console.log("response", response);
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error);
    }
}

exports.UpdateProfile = async(data) => {
    console.log("data",data)
   
    try{
        const response = await axios.put(Profile.UpdateProfile, data);
        console.log("response hai baba abhi ka", response);
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error.messege);
    }
}

exports.DeleteProfile = async(data) => {
    console.log("data",data)
    try{
        const response = await axios.delete(Profile.DeleteProfile, data);
        console.log("response hai baba abhi ka", response);
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error);
    }
}


exports.UpdatePassword = async (Email,newPassword) => {
    try{
        const response = await axios.post(Profile.updatepassword, {Email,newPassword});
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error);
    }
}
