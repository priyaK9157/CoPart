import axios from 'axios';
import {Profile} from '../Api';

exports.FindByEmail = async (email) => {
    try{
        const response = await axios.post(Profile.profileInfo, {Email:email});
        console.log("response", response)
        if(response){
            return response;
        }
    }catch(error){
        console.log("error", error);
    }
}