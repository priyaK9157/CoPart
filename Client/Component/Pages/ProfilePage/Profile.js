import React, { useEffect } from 'react'
import { useState} from 'react';
import {View, Text} from 'react-native'
import {FindByEmail} from '../../../services/operations/ProfileHandler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DecodedTokenHandler} from '../../../services/operations/generate&verifyOTP'
import tw from "twrnc";
import { useFonts } from 'expo-font';



const Profile = () => {

    const [profile, setProfile] = useState([]);

    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
    });

    const findProfileByEmail = async() =>{
        try{
            const Token = await AsyncStorage.getItem('token');
           
            console.log("Token", Token)
            const res = await DecodedTokenHandler(Token);
            console.log("res", res);
            const email = res.data.Email;
            console.log("email", email)
            console.log("email", email)
            const response = await FindByEmail(email);
            console.log("response", response.data.response);
            setProfile(response.data.response);
        }catch(error){
            console.log("error", error);
        }
    }

    useEffect(()=>{
        findProfileByEmail();
    },[])

    useEffect(()=>{
        console.log("updated profile", profile);
    },[profile])
  return (
    <View>
        {
            profile && (
                <View>
                    <Text style={[tw`text-xl p-3`, {fontFamily:"MadimiOne"}]}>{profile.name}</Text>            
                    <Text style={[tw`text-xl p-3`, {fontFamily:"MadimiOne"}]}>{profile.Professional_Role}</Text>  
                    <Text style={[tw`text-xl p-3`, {fontFamily:"TwinkleStar"}]}>{profile.User_Bio}</Text>   
                    

                    <View>
                    <Text style={[tw`text-xl`, {fontFamily:"MadimiOne"}]}>Work History</Text>
                        {
                            profile.SavedJobs && profile.SavedJobs.map((job, index) => (
                                <View key={index}>
                                <Text style={[tw`text-xl p-3`, {fontFamily:"MadimiOne"}]}>Your project catalog</Text>
                                    <Text style={tw`p-3`}>{job.projectName}</Text>
                                    <Text style={[tw`text-xl p-3`, {fontFamily:"TwinkleStar"}]}>{job.projectDescription}</Text>
                                    <Text style={[tw`text-xl p-3`, {fontFamily:"MadimiOne"}]}>{job.skill}</Text>
                                </View>
                            ))
                        }
                    </View>

                    <View>
                    <Text style={[tw`text-xl`, {fontFamily:"MadimiOne"}]}>Skills</Text>
                        {
                            profile?.TechStack?.map((stack, index) => (
                                <View key={index} style={tw`bg-gray-300 rounded-md flex gap-2 mr-2 `}>
                                    {stack}
                                </View>
                            ))
                        }
                    </View> 
                    <View>
                    <Text style={[tw`text-xl p-3`, {fontFamily:"MadimiOne"}]}>Linked accounts</Text>
                        <Text style={tw`pl-3`}>{profile.GithubLink}</Text> 
                        <Text style={tw`pl-3`}>{profile.LinkedIn}</Text>
                    </View>
                </View>
            )
        }
    </View>

  )
}

export default Profile