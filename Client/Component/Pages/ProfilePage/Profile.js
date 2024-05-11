import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FindByEmail } from '../../../services/operations/ProfileHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import tw from "twrnc";
import { useFonts } from 'expo-font';
import { findProjectById } from "../../../services/operations/ProjectsHandler";
import { DeleteProfile } from "../../../services/operations/ProfileHandler"
import { Entypo, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import {UpdateProfile} from "../../../services/operations/ProfileHandler"

const Profile = () => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        findProfileByEmail();
    }, []);

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
        navigation.navigate('EditLinkdedinAcc', { linkedinLink: profile.LinkedIn });
    }

    const navigateToGithubAcc = () => {
        navigation.navigate('EditGithubAcc', { GithubLink: profile.GithubLink });
    }

    const navigateToEditProject = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decodedEmail = await DecodedTokenHandler(token);
            const Email = decodedEmail.data.Email;
            const User_Profile = await FindByEmail(Email);
            delete User_Profile.data.response.projectName;
            await DeleteProfile({ data: User_Profile.data.response });
            navigation.navigate('Profile');
        } catch (error) {
            console.error('Error deleting project:', error.message);
        }
    }

    const handleAddProject = async () => {
        try {
            navigation.navigate('Index')
        } catch (error) {
            console.log("error in catch block", error.message);
        }
    }

    // Load fonts
    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf"),
        BriemHand: require("../../../assets/Fonts/BriemHand-VariableFont_wght.ttf"),
       

        
    });



    return (
        <View style={tw`bg-gray-100`}>
            <View style={tw`flex flex-row items-center pt-10 m-5`}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <Feather name="arrow-left" size={24} color="green"/>
                </TouchableOpacity>
                <Text style={[tw`text-2xl ml-2`, { fontFamily: "MadimiOne" }]}>Profile</Text>
            </View>
            <ScrollView style={tw``}>
                <View style={tw`mx-auto`}>
                    <View style={tw` mt-3 m-3 w-11/12  bg-red-200 p-5 rounded-2xl flex flex-col shadow-xl`}>
                        <View style={tw` flex flex-row gap-3  `}>
                            <Feather name="alert-triangle" size={24} color="#ef4444" />
                            <Text style={[tw` text-slate-700 max-w-[90%]`, { fontFamily: "MadimiOne" }]}>Kindness knows no bounds. Respect every soul you encounter here. Our community thrives on mutual respect and understanding.</Text>
                        </View>
                        <View style={tw` flex flex-row gap-3  mt-3 items-center`}>
                            <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#0d9488" />
                            <Text style={[tw` text-slate-700 max-w-[90%]`, { fontFamily: "MadimiOne" }]}>WorldWide</Text>
                        </View>
                    </View>

                    {fontsLoaded && profile ? (
                        <View style={tw` mx-auto`}>
                            <View style={tw`flex ml-3 flex-row gap-4 pt-7 items-center`}>
                                <Text style={[tw`flex justify-between items-center text-5xl  border border-gray-400 rounded-full px-3 py-4  text-green-500  `, { fontFamily: "MadimiOne" }]}>{profile.name.split(' ').map(name => name.charAt(0)).join('')}</Text>
                                <View style={tw`pb-10`}>
                                    <Text style={[tw`text-3xl mr-2 pb-3 pt-4 `, { fontFamily: "MadimiOne" }]}>{profile.name}</Text>
                                    <Text style={[tw`text-base`, {fontFamily:'MadimiOne'}]}>{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} local time</Text>
                                </View>
                            </View>
                            
                        <View style={tw`w-10/12 bg-gray-200 p-8 flex flex-row shadow-md`}>
                            <View style={tw` flex flex-row gap-3  `}>
                                <Foundation name="book-bookmark" size={30} color="green" />
                                <Text style={[tw` text-slate-700 max-w-[100%]`, { fontFamily: "MadimiOne" }]}>Creating connections from pixels to databases, I'm here to weave together your dreams with code that's as friendly as it is powerful. Let's build bridges, not barriers!</Text>
                                <FontAwesome name="book" size={30} color="brown" />
                            </View>
                          
                        </View>

                            <View style={tw`max-w-[90%] ml-5 m-4 pt-5`}>
                                <View style={tw`flex flex-row justify-between items-center` }>
                                    <Text style={[tw`text-3xl mr-2 mb-6`, { fontFamily: "MadimiOne"  }]}>{profile.Professional_Role}</Text>
                                    <TouchableOpacity onPress={navigateToEditProfessionalRole}>
                                        <Feather name="edit" size={25} color="green" style={tw`text-red-400`} />
                                    </TouchableOpacity>
                                </View>

                                <Foundation name="comment-quotes" size={30} color="black" />
                                
                                <View style={tw`w-11/12 flex flex-row justify-between items-center pb-4 mr-2`}>
                                
                                    <Text style={[tw`text-lg mr-4`, { fontFamily: "BriemHand" }]}>{profile.User_Bio}</Text>
                                    <TouchableOpacity onPress={navigateToEditUserBio} style={tw`ml-65`}>
                                        <Feather name="edit" size={25} color="green" style={tw`text-red-400`}/>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                            <Text style={tw`border-t border-gray-400`}></Text>
                            
                             


                            <View style={[tw`pt-10 ml-5 mr-2 pb-14`]}>
                                <View style={tw`flex flex-row justify-between items-center pb-4`}>
                                    <Text style={[tw`text-3xl mr-2`, { fontFamily: "MadimiOne" }]}>Skills</Text>
                                    <TouchableOpacity onPress={navigateToEditSkills} style={tw`mr-10`}>
                                        <Feather name="edit" size={25} color="green" style={tw`text-red-400`}/>
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
                            
                            {/* <Text style={tw`border-t border-gray-400`}></Text> */}
                            <View style={tw`w-[100%] bg-red-200 p-8 flex flex-row shadow-2xl`}>
                                <View style={tw` flex gap-3 `}>
                                <View style={tw`flex flex-row justify-between`}>
                                    <Foundation name="comment-quotes" size={30} color="black" />
                                    <FontAwesome6 name="smile" size={24} color="black" />
                                </View>
                                    <Text style={[tw` text-slate-700 max-w-[100%]`, { fontFamily: "MadimiOne" }]}>Empowering Ideas, Transforming Realities: One Project at a Time.!</Text>
                                    
                                </View>
                          
                            </View>

                            <View style={tw`w-10/12 flex justify-between pt-10 ml-5 m-4`}>
                                <Text style={[tw`text-3xl pb-6`, { fontFamily: "MadimiOne" }]}>Your project catalog</Text>
                                {projects ? (
                                    projects.map((project, index) => (
                                        <View key={index} style={tw`pb-8`}>
                                            <View style={tw`flex flex-row justify-between items-center`}>
                                                <TouchableOpacity>
                                                    <Text style={[tw`text-2xl mr-8 pt-4 pb-4`, { fontFamily: "MadimiOne" }]}>{project.projectName}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => navigateToEditProject(project._id)}>
                                                    <Feather name="trash-2" size={25} color="red-400" style={tw`text-red-400`}/>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={[tw`text-base`, { fontFamily: "BriemHand" }]}>{project.projectDescription}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No projects found.</Text>
                                )}
                                <TouchableOpacity onPress={handleAddProject}>
                                    <View style={tw`flex flex-row justify-center items-center p-10 `}>
                                        <Feather name="plus-circle" size={25} color="green" />
                                        <Text style={[tw`text-xl pl-2`, { fontFamily: "MadimiOne" }]}>Add more Projects</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={tw`border-t border-gray-400`}></Text>

                            <Text style={[tw`ml-5 text-3xl w-10/12 `,{fontFamily:'MadimiOne'}]}>Linked accounts</Text>

                            <View style={[tw`pb-35 pt-6`, { alignItems: 'center' }]}>
                                <View style={tw`flex flex-row items-center`}>
                                    <TouchableOpacity onPress={() => openLink(profile.GithubLink)}>
                                        <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-25 py-1 m-2 font-semibold`}>
                                            <Feather style={tw`px-10`} name="github" size={25} color="red-400" />GitHub
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={navigateToGithubAcc}>
                                        <Feather name="edit" size={24} color="black" style={tw`text-red-400`} />
                                    </TouchableOpacity>
                                </View>

                                <View style={tw`flex ml-5 m-4 flex-row items-center`}>
                                    <TouchableOpacity onPress={() => openLink(profile.LinkedIn)}>
                                        <Text style={tw`pl-3 text-green-800 text-base rounded-full border-solid border border-green-800 px-24 py-1 m-2 font-semibold`}>
                                            <Feather style={tw`px-50`} name="linkedin" size={20} color="red-400" />
                                            LinkedIn
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={navigateToLinkedInAcc}>
                                        <Feather name="edit" size={24} color="red-400" style={tw`text-red-400`} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default Profile;
