import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { FindByEmail } from '../../../services/operations/ProfileHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import tw from "twrnc";
import { useFonts } from 'expo-font';
import { findProjectById } from "../../../services/operations/ProjectsHandler";
import {DeleteProfile} from "../../../services/operations/ProfileHandler"
import { Entypo ,Ionicons,Feather,MaterialCommunityIcons} from '@expo/vector-icons';



const Profile = () => {
    const navigation = useNavigation(); // Initialize navigation hook
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
            const email = res.data.Email;
            const response = await FindByEmail(email);
            const id = response.data.response._id;
            const projects = await findProjectById(id)
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


    const navigateToEditProfileName = () => {
        navigation.navigate('EditProfileName', { profileName: profile.name });
    }

    const navigateToEditProfessionalRole = () => {
        navigation.navigate('EditProfessionalRole', { professionalRole: profile.Professional_Role });
    }

    const navigateToEditUserBio = () => {
        navigation.navigate('EditUserBio', { userBio: profile.User_Bio });
    }

    const navigateToEditSkills = () => {
        navigation.navigate('EditSkills', { skills: profile.TechStack });
    }


    const navigateToLinkedInAcc = () => {
        navigation.navigate('EditLinkdedinAcc', {linkedinLink: profile.LinkedIn });
    }

    const navigateToGithubAcc = () => {
        navigation.navigate('EditGithubAcc', {GithubLink: profile.GithubLink });
    }
  
    const navigateToEditProject = async() => {
        try {
           
            const token = await AsyncStorage.getItem('token');
            const decodedEmail = await DecodedTokenHandler(token);
            const Email = decodedEmail.data.Email;
            const User_Profile = await FindByEmail(Email);
       
            // Delete the project from the profile data
            delete User_Profile.data.response.projectName;
    
            // Call the UpdateProfile function with the updated profile data
            await DeleteProfile({ data: User_Profile.data.response });

            console.log("eerrrr")
            navigation.navigate('Profile');
        } catch (error) {
           console.log("catch m error h")
            console.error('Error deleting project:', error.messege);
            
        }
    }

    const handleAddProject  = async() => {
        try{
            navigation.navigate('Index')
        }catch(error){
            console.log("error in catch block", error.messege);
        }
    }

    return (
        <ScrollView style={tw``}>
            <View style={tw`w-11/12 mx-auto`}>
                    <View style={tw`flex flex-row items-center pt-10 m-5`}>
                        <TouchableOpacity onPress={()=>navigation.navigate('HomePage')}>
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={[tw`text-2xl ml-2`, { fontFamily: "MadimiOne" }]}>Profile</Text>
                    </View>

                    <View style={tw` mt-3  bg-red-200 p-5 rounded-2xl flex flex-col shadow-xl`}>
                                    <View style={tw` flex flex-row gap-3  `}>
                                        <Feather name="alert-triangle" size={24} color="#ef4444" />
                                        <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>Kindness knows no bounds. Respect every soul you encounter here. Our community thrives on mutual respect and understanding.</Text>
                                    </View>
                                    <View style={tw` flex flex-row gap-3  mt-3 items-center`}>
                                            <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#0d9488" />
                                            <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>WorldWide</Text>
                                    </View>
                    </View>

                    {fontsLoaded && profile ? (
                        <View style={tw`w-11/12 mx-auto`}>
                        <View style={tw`flex flex-row gap-4 pt-7 items-center`}>
                                <Text style={[tw`text-3xl  border border-gray-400 rounded-full px-3 py-1  text-green-500  `, { fontFamily: "MadimiOne" }]}>{profile.name.split(' ').map(name => name.charAt(0)).join('')}</Text>
                            <View>
                                <Text style={[tw`text-2xl mr-2 pb-4 pt-4 `, { fontFamily: "MadimiOne" }]}>{profile.name}</Text>
                                 
                           </View>  
                            </View>

                            <View style={tw` pt-5 border-t border-gray-400`}>
                                <View style={tw`flex flex-row items-center `}>
                                    <Text style={[tw`text-2xl mr-2 `, { fontFamily: "MadimiOne" }]}>{profile.Professional_Role}</Text>
                                    <TouchableOpacity onPress={navigateToEditProfessionalRole}>
                                        <Feather name="edit" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View style={tw`flex pt-3 flex-row items-center border-b border-gray-400 pb-4 mr-2`}>
                                    <Text style={[tw`text-lg mr-4 `, { fontFamily: "TwinkleStar" }]}>{profile.User_Bio}</Text>
                                    <TouchableOpacity onPress={navigateToEditUserBio}>
                                        <Feather name="edit" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[tw`pt-5 pb-5 border-b border-gray-400 `]}>
                                <View style={tw`flex flex-row items-center pb-4`}>
                                    <Text style={[tw`text-2xl mr-2`, { fontFamily: "MadimiOne" }]}>Skills</Text>
                                    <TouchableOpacity onPress={navigateToEditSkills}>
                                            <Feather name="edit" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {profile.TechStack && profile.TechStack.map((stack, index) => (
                                        <Text key={index} style={tw`bg-gray-300 px-6 py-1 rounded-full flex flex-row m-1 p-2`}>
                                            {stack}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            
                            

                            <View style={tw`pt-5 border-gray-400`}>
                                <Text style={[tw`text-2xl pb-3`, { fontFamily: "MadimiOne" }]}>Your project catalog</Text>
                                {projects ? (
                                    projects.map((project, index) => (
                                        <View key={index}>
                                            <View style={tw`flex flex-row justify-between items-center`}>
                                                <TouchableOpacity>
                                                    <Text style={[tw`text-2xl pt-4 pb-4 px-4`, { fontFamily: "MadimiOne" }]}>{project.projectName}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => navigateToEditProject(project._id)}>
                                                    <Feather name="trash-2" size={20} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={[tw`text-base p-3`, { fontFamily: "TwinkleStar" }]}>{project.projectDescription}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No projects found.</Text>
                                )}

                                {/* Add icon */}
                                <TouchableOpacity onPress={handleAddProject}>
                                    <View style={tw`flex flex-row justify-center items-center p-4`}>
                                        <Feather name="plus-circle" size={20} color="green" />
                                        <Text style={[tw`text-xl pl-2`, { fontFamily: "MadimiOne" }]}>Add more Projects</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>



                            <Text style={[tw`text-2xl pt-5 border-t border-gray-400 pb-4`, { fontFamily: "MadimiOne" }]}>Linked accounts</Text>
                            <View style={[tw`mr-8 border-b pb-5 border-gray-400`, { alignItems: 'center' }]}>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-25 py-1 m-2 font-semibold`} onPress={() => openLink(profile.GithubLink)}><Feather style={tw`px-10`} name="github" size={20} color="green" />GitHub</Text>
                                    <TouchableOpacity onPress={navigateToGithubAcc}>
                                        <Feather name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-24 py-1 m-2 font-semibold`} onPress={() => openLink(profile.LinkedIn)}><Feather style={tw`px-50`} name="linkedin" size={20} color="green" />LinkedIn</Text>
                                    <TouchableOpacity onPress={navigateToLinkedInAcc}>
                                        <Feather name="edit" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            

                            {/* Remaining profile content */}
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
            </View>
        </ScrollView>
    );
}

export default Profile;
