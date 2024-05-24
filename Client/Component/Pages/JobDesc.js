
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import {  useSelector } from 'react-redux';
import { ProjectsByNameHandler } from '../../services/operations/ProjectsHandler'
import { useFonts } from 'expo-font';
import tw from 'twrnc'
import Navbar from '../Common/Navbar';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {DecodedTokenHandler} from "../../services/operations/generate&verifyOTP"
import {GetUserDetail} from "../../services/operations/SignupHandler"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import LinkedinIcon from "../../assets/LinkedIn_icon_circle.png"
import GithubIcon from "../../assets/github_icon.webp"
import gmailIcon from "../../assets/gmail-icon-free-png.webp"
import { AntDesign } from '@expo/vector-icons';
import {addSavedProject,RemoveSavedProject} from "../../services/operations/savedProjectHandler"


const JobDesc = () => {
  const [project, setProject] = useState([]);
  const[userData,setUserData]=useState()
  const {desc} = useSelector((state)=>state.signup);
  const [isSaved, setIsSaved] = useState(false);
 const{projectName,projectDescription,Skill}=desc;
  const [fontsLoaded] = useFonts({
    MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
    TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
  }); 

  const fetchProjectById = async () => {
    try {
      const variable = await ProjectsByNameHandler(projectName);
      const response = variable.data.projects;
      setProject(response);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  
  async function GetUserDetails(){

    const token=await AsyncStorage.getItem('token');
    const EmailInfo=await DecodedTokenHandler(token);
    const responseActualDetail=await GetUserDetail(EmailInfo.data.Email)
    setUserData(responseActualDetail.data.response)

    if (responseActualDetail.data.response) {
      const savedJobs = responseActualDetail.data.response.SavedJobs || [];
      const isSaved = savedJobs.some((job) => job._id === project?._id);
      setIsSaved(isSaved);
    }
  }


  useEffect(() => {
    fetchProjectById();
  }, [projectName,isSaved]);

  useEffect(()=>{
    GetUserDetails();
  },[])


  
  function handleLinkedinIcon(){
       Linking.openURL("https://www.linkedin.com/in/"+userData?.LinkedIn);
       return;
  }

  function handleGithubIcon(){
     Linking.openURL("https://github.com/"+userData?.GithubLink);
     return;
  }
  
  function handleGmailIcon() {
      const emailSubject = 'Regarding Project';
      const emailBody = 'Hi, I am interested in the project.';
      const mailtoLink = `mailto:${userData?.Email}?subject=${emailSubject}&body=${emailBody}`;

      Linking.openURL(mailtoLink);
     return;
  }

  async function handleSavedProject(projectId){
       if(isSaved===false){
          await addSavedProject(userData?.Email,projectId)
          setIsSaved(true)
          // popup project saved
       } else{
           await RemoveSavedProject(userData?.Email,projectId)
           setIsSaved(false)
       }
  } 
  return (
    <View style={[tw` bg-white h-[100%]`]}>
       <Navbar header="Job Details"/>  
      <ScrollView style={tw``}>
        <View style={tw` w-10/12 mx-auto mt-3`}>
            <View style={tw`  border-b-2 border-gray-200 pb-13 w-[100%]`}>
                <Text style={[tw` text-lg`,{fontFamily:"MadimiOne"}]}>{project?.projectName}</Text>
                <Text>Posted 26 minute ago</Text>
                <View style={tw`mt-3  bg-red-200 p-5 rounded-2xl flex flex-col shadow-xl`}>
                      <View style={tw` flex flex-row gap-3  `}>
                        <Feather name="alert-triangle" size={24} color="#ef4444" />
                        <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>Kindness knows no bounds. Respect every soul you encounter here. Our community thrives on mutual respect and understanding.</Text>
                      </View>
                      <View style={tw` flex flex-row gap-3  mt-3 items-center`}>
                              <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#0d9488" />
                              <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>WorldWide</Text>
                      </View>
                </View>
            </View>
            <View style={tw` mt-7 border-b-2 border-gray-200 pb-10`}>
                 <Text style={[tw` text-lg max-w-[85%]`,{fontFamily:"MadimiOne"}]}>{project?.projectDescription}</Text>
            </View>
            <View style={tw` mt-4 flex flex-col gap-5 border-b-2 border-gray-200 pb-8`}>
                 <View style={tw` flex flex-row gap-3 items-center`}>
                        <Feather 
                          name="user"
                          size={24} 
                          color="black" 
                          />
                       <View>
                          <Text style={[tw` text-lg`,{fontFamily:"MadimiOne"}]}>
                              {project?.BasicDetail?.LevelExperience} Level
                          </Text>
                          <Text>Experience Level</Text>
                       </View>
                 </View>
                 <View style={tw` flex flex-row gap-3 items-center`}>
                      <Ionicons name="time-outline" size={24} color="black" />
                       <View>
                          <Text style={[tw` text-lg`,{fontFamily:"MadimiOne"}]}>
                              {project?.BasicDetail?.spanPeriod} Month
                          </Text>
                          <Text>Span Period</Text>
                       </View>
                 </View>
                 <View style={tw` flex flex-row gap-3 items-center`}>
                     <MaterialCommunityIcons name="syllabary-katakana-halfwidth" size={24} color="black" />
                       <View>
                          <Text style={[tw` text-lg`,{fontFamily:"MadimiOne"}]}>
                              {project?.BasicDetail?.projectLength} Project
                          </Text>
                          <Text>Project Type</Text>
                       </View>
                 </View>
            </View>
            <View style={tw` mt-8 border-b-2 border-gray-200 pb-8`}>
                <Text style={[tw` text-lg `,{fontFamily:"MadimiOne"}]}>Skills And Expertise Required</Text>
                <View style={tw` mt-7 flex flex-row flex-wrap gap-3 `}>
                     {
                      project?.Skill?.map((data,index)=>(
                         <View key={index} style={tw` bg-slate-200 w-[30%] px-1  py-2 rounded-2xl`}>
                               <Text style={tw` mx-auto text-slate-600`}>{data}</Text>
                         </View>
                      ))
                     }
                </View>
            </View>
            <View style={tw` mt-7`}>
                 <Text style={[tw` text-lg`,{fontFamily:"MadimiOne"}]}>About the users</Text>
                 <View style={tw` mt-4 flex flex-row items-center gap-2`}>
                     <MaterialIcons name="verified" size={24} color="#15803d" />
                     <Text style={[tw``,{fontFamily:"MadimiOne"}]} >User Verified</Text>
                 </View>
                 <View style={tw` mt-4 flex flex-row items-center gap-2`}>
                     <MaterialIcons name="verified" size={24} color="#15803d" />
                     <Text style={[tw``,{fontFamily:"MadimiOne"}]} >Location Verified</Text>
                 </View>
                 <Text style={[tw` text-lg mt-4`,{fontFamily:"MadimiOne"}]}>Contact {userData?.name}</Text>
                 <Text style={[tw` text-[15px] mt-2`,{fontFamily:"MadimiOne"}]}>Here's all The Social Media Handle</Text>
                 <View style={tw` mt-4 flex flex-row gap-2`}>
                      <TouchableOpacity onPress={handleLinkedinIcon}>
                            <Image source={LinkedinIcon} style={{height:40,width:40}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleGithubIcon}>
                             <Image source={GithubIcon} style={[tw``,{height:40,width:40}]}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleGmailIcon}>
                            <Image source={gmailIcon} style={[tw` shadow-xl`,{height:40,width:40}]}/>
                      </TouchableOpacity>
                 </View>
            </View>
        </View>
      </ScrollView>
      <View style={tw`-ml-3`}>
        <View style={[tw`gap-3  `,{ borderTopWidth: 5, borderTopColor: '#E5E7EB',padding:17,display:'flex',flexDirection:'row', justifyContent:'space-between' }]}>
            <TouchableOpacity onPress={handleGmailIcon}>
          
                    <Text style={tw` border border-gray-300 bg-green-600 text-white font-bold p-3 rounded-full px-5`}>Mail To {userData?.name}</Text>
                 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSavedProject(project?._id)} >
                 <View style={tw`  border-[3px] border-green-600 p-2    px-3 rounded-full font-bold flex flex-row justify-center items-center gap-3`}>
                      {isSaved ? <AntDesign name="heart" size={24} color="#15803d" /> :  <AntDesign name="hearto" size={24} color="#15803d"/>}
                      <Text style={tw`font-bold`}> {isSaved ? 'Unsave Project' : 'Saved Project'}</Text>
                 </View>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  );
};

export default JobDesc;