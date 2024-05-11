import axios from 'axios'

const { generateVerifyOTP } = require("../Api")

export const generateOTP = async(email,purpose) => {
    try{
        const response = await axios.post(generateVerifyOTP.generateOTP, {Email: email,purpose})
        
        return response;
    }catch(error){
        console.error("Error:", error);
    }
}

export const verifyOTP = async(email, user_Otp) => {
    
    try{
        const response = await axios.post(generateVerifyOTP.verifyOTP, {Email: email, user_Otp: user_Otp})
    
        return response;
    }catch(error){
        console.error("error", error.message)
    }
}

export const login = async(email, password) => {
    try{
        const response = await axios.post(generateVerifyOTP.login, {email,password})
        return response;
    }catch(error){
        console.log("Error", error.message)
    }
}

export const DecodedTokenHandler=async(token)=>{
 
    try{
    const response=await axios.post(generateVerifyOTP.DecodedApi,{token});
   
    return response;

    } catch(error){
         console.log("error",error)
    }
}