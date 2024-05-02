// import React, { useState } from 'react'
// import { View ,Text,Image,TouchableOpacity} from 'react-native'
// import image1 from "../../assets/circle-star.png"
// import tw from "twrnc"
// import { useFonts } from 'expo-font'
// import {  useDispatch, useSelector } from 'react-redux'
// import Navbar from '../Common/Navbar'
// import { ScrollView, TextInput } from 'react-native-gesture-handler'
// import SkillButton from '../Common/SkillButton'
// import { SkillRequired } from '../../ArrayUsable/SkillsRequired'
// import { updateSkill } from '../../reducers/signupReducer'
// import Spinner from 'react-native-loading-spinner-overlay'
// import Footer from '../Common/Footer'


// const Skill = () => {
//     const[loading,setLoading]=useState(false);
//     const [skillInput, setSkillInput] = useState("");
//     const[selectedButton,setSelectedButton]=useState([])
//     const [fontsLoaded] = useFonts({
//         MadimiOne: require('../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
//         TwinkleStar: require('../../assets/Fonts/-W_oXI_oSymQ8Qj-Apx3HGN_Hu1RTCk5FtSDETgf0cK_NOeFgpRt9rN5.ttf'),
//       });

  
//   return (
//     <View style={tw` h-[100%]`}>
//      <Navbar/>
//        <View style={tw` w-11/12 mx-auto mt-6`}>
        
//         <Text style={[tw` mt-7 text-3xl  `,{fontFamily:"MadimiOne"}]}>Choose  Your Favourite Skills !</Text>
//         <TextInput
//           value={skillInput}
//           onChangeText={(text) => setSkillInput(text)} 
//           onSubmitEditing={(event) => {
//             const skill = event.nativeEvent.text;
//             if (skill.trim() !== "") {
//               setSelectedButton((prevSelectedSkills) => [...prevSelectedSkills, skill]);
//               setSkillInput('')
//             }}}
//             placeholder="Search or add up to 10 skills"
//             style={tw` mt-4 w-11/12  border border-b-1 rounded-md p-2 border-gray-300`}
//         />
//         <View style={tw` flex flex-row gap-2 items-center mt-4 `}>
//             <Image source={image1} style={{color:"gray", height: 18,width:18 }} />
//              <Text style={tw` text-slate-500`}>For The Best Results, add 2-5 Skills</Text>
//         </View>
//         <ScrollView style={tw`h-[47%] `}>
//             { 
//               selectedButton.length>0 && (
//                 <View >
//                       <Text style={[tw` mt-7 text-xl  `,{fontFamily:"MadimiOne"}]}>Your Selected Skill</Text>
                    
//                               <View style={tw` flex flex-row max-w-[97%] gap-1  flex-wrap`}>
//                                   {
//                                     selectedButton.map((data,index)=>(
//                                         <SkillButton key={index} text={data} setSelectedButton={setSelectedButton} selectedButton={selectedButton}   flag="true" />
//                                     ))
//                                   }
//                               </View>
                    
//                 </View>
//               )
//             }
//             <Text style={[tw` mt-7 text-xl  `,{fontFamily:"MadimiOne"}]}>Popular Skill For Full Stack Developer </Text>
          
//               <View style={tw` flex flex-row max-w-[97%] gap-1  flex-wrap`}>
//                   {
//                     SkillRequired.filter(skill=>!selectedButton.includes(skill.name)).map((data,index)=>(
//                         <SkillButton key={index} text={data.name}  setSelectedButton={setSelectedButton}  selectedButton={selectedButton}  flag="false"/>
//                     ))
//                   }
//               </View>
          
//         </ScrollView>
//         {/*spinner*/}
//         <Spinner
//           visible={loading}
//         />

//        </View>
//        <Footer
//          button1Text="Back"
//          button1Navigate="ProfessionalInfo"
//          button2Text="One Last Step"
//          reducerName={updateSkill}
//          data={selectedButton}
//          navigate="UserBio"
//        />
//     </View>
//   )
// }

// export default Skill

// Skill.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSkill } from '../../reducers/signupReducer';
import CommonSkillPage from '../Common/CommonPage/CommonSkillPage';

const Skill = () => {
  const dispatch = useDispatch();

  return (
    <CommonSkillPage
      updateStep={() => {}}
      updateSkills={(skills) => dispatch(updateSkill(skills))}
      navigateRef="UserBio"
    />
  );
};

export default Skill;
