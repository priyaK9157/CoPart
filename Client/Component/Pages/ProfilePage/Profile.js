import React, { useEffect, useState } from 'react';
import { ScrollView,View, Text, Linking } from 'react-native';
import { FindByEmail } from '../../../services/operations/ProfileHandler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import tw from "twrnc";
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import {findProjectById} from "../../../services/operations/ProjectsHandler"

const Profile = () => {
    const [profile, setProfile] = useState(null); 
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        findProfileByEmail();
    }, []);

    useEffect(() => {
        console.log("updated profile", profile);
    }, [profile]);

    const findProfileByEmail = async () => {
        try {
            const Token = await AsyncStorage.getItem('token');
            const res = await DecodedTokenHandler(Token);
            console.log("res", res)
            const email = res.data.Email;
            const response = await FindByEmail(email);
            const id = response.data.response._id;
            console.log("id", id)
            const projects = await findProjectById(id);
            console.log("projects", projects)
            console.log("first", projects.data.project)
            console.log("response", response)
            setProfile(response.data.response);
            setProjects(projects.data.project)
        } catch (error) {
            console.log("error", error);
        }
    }

    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    // Load fonts
    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
    });

    return (
        <ScrollView>
            {fontsLoaded && profile ? ( 
                    <View style={tw`pl-6 p-3`}>
                    <View style={tw`flex flex-row pt-20`}>
                        <Text style={[tw`text-3xl border border-gray-400 rounded-full pt-4 pb-4 px-4 text-green-500 `, { fontFamily: "MadimiOne" }]}>{profile.name.split(' ').map(name => name.charAt(0)).join('')}</Text>
                        <Text style={[tw`text-3xl border-t border-gray-400 pb-4 pt-4 `, { fontFamily: "MadimiOne" }]}>{profile.name}</Text>
                    </View>
                    <Text style={[tw`text-3xl pt-5 border-t border-gray-400 `, { fontFamily: "MadimiOne" }]}>{profile.Professional_Role}</Text>
                    <Text style={[tw`text-base mr-4 border-b border-gray-400 pb-4`, { fontFamily: "TwinkleStar" }]}>{profile.User_Bio}</Text>

                    <View style={[tw`pt-5 pb-5 border-b border-gray-400`]}>
                        <Text style={[tw`text-3xl pb-4`, { fontFamily: "MadimiOne" }]}>Skills</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                            {profile.TechStack && profile.TechStack.map((stack, index) => (
                                <Text key={index} style={tw`bg-gray-300 px-6 py-1 rounded-full flex flex-row m-1 p-2`}>
                                    {stack}
                                </Text>
                            ))}
                        </View>
                    </View>

                    <View style={tw`pt-5 border-gray-400`}>
                        <Text style={[tw`text-3xl pb-3`, { fontFamily: "MadimiOne" }]}>Your project catalog</Text>
                        {projects ? (
                            projects.map((project, index) => (
                                <View key={index}>
                                <Text style={[tw`text-3xl pt-4 pb-4 px-4`, { fontFamily: "MadimiOne" }]}>{project.projectName}</Text>
                                    <Text style={[tw`text-base p-3`, { fontFamily: "TwinkleStar" }]}>{project.projectDescription}</Text>
                                    
                                </View>
                            ))
                        ) : (
                            <Text>No projects found.</Text>
                        )}
                    </View>



                    <Text style={[tw`text-3xl pt-5 border-t border-gray-400 pb-4`, { fontFamily: "MadimiOne" }]}>Linked accounts</Text>
                    <View style={[tw`mr-8 border-b pb-5 border-gray-400`, { alignItems: 'center' }]}>
                        <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-25 py-1 m-2 font-semibold`} onPress={() => openLink(profile.GithubLink)}><Feather style={tw`px-10`} name="github" size={20} color="green" />GitHub</Text>
                        <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-24 py-1 m-2 font-semibold`} onPress={() => openLink(profile.LinkedIn)}><Feather style={tw`px-13`} name="linkedin" size={20} color="green" />LinkedIn</Text>
                    </View>

                </View>
            ) : (
                <Text>Loading...</Text> 
            )}
        </ScrollView>
    );
}

export default Profile;
