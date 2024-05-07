import axios from "axios";
import { AlertRoute } from "../Api";
import {FindByEmail} from "./ProfileHandler"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DecodedTokenHandler } from "./generate&verifyOTP";


export const GetRecentAlert=async()=>{
    try{
        console.log("in the")
        const token = await AsyncStorage.getItem('token');
        //find email
        const decodedEmail=await DecodedTokenHandler(token);
        // with help of email find 
        const User_Profile=await FindByEmail(decodedEmail.data.Email);
        const ProfileId=User_Profile.data.response._id
        const response = await axios.post(AlertRoute.RecentAlert,{ProfileId})

        return response.data;
    }catch(error){
        console.error("Error:", error);
    }
}

export const Recent10Alert=async()=>{
    try{
        const token = await AsyncStorage.getItem('token');
        //find email
        const decodedEmail=await DecodedTokenHandler(token);
        // with help of email find 
        const User_Profile=await FindByEmail(decodedEmail.data.Email);
        //make a profile id
        const ProfileId=User_Profile.data.response._id
        //make a api call
        const response = await axios.post(AlertRoute.Recent10Alert, {ProfileId})
        //return the data
        return response.data;
    }catch(error){
        console.error("Error:", error);
    }
}