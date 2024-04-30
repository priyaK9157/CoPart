import React, { useEffect, useState } from 'react'
import { Text, View ,TextInput,Image,TouchableOpacity, Alert } from 'react-native'
import Navbar from '../Common/Navbar'
import { useFonts } from 'expo-font';
import tw from "twrnc"
import Footer from '../Common/Footer';
import image from "../../assets/userImage.png"
import { ScrollView } from 'react-native-gesture-handler';
import { updateProfessionalDes, updateProfessionalRole } from '../../reducers/professionalRole';
import { signupHandler } from "../../services/operations/SignupHandler"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';


const UserBio = () => {
   const [value, setValue] = useState();
   const { data, skill } = useSelector((state) => state.signup)
   const [loading, setLoading] = useState(false);
   const navigate = useNavigation()
   const dispatch = useDispatch()
   const { professionalRole, GithubLink, LinkedInLink } = useSelector((state => state.professionalRole));

   const [fontsLoaded] = useFonts({
      MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
      TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
   });

   if (!fontsLoaded) {
      return null;
   }

   async function handlePress() {
      if (!value) {
         Alert.alert(
            'All Field Required',
            '',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
         );
         return;
      }
      dispatch(updateProfessionalDes(value));
      const Tech = {
         ...skill
      }


      const updatedData = { ...data, Tech, proffesional_Role: professionalRole, user_Dec: value, GithubLink: "https://github.com/" + GithubLink, LinkedinLink: "https://www.linkedin.com/" + LinkedInLink };
      setLoading(true);
      const response = await signupHandler(updatedData);
      setLoading(false);
      if (response.status === 200) {
         navigate.navigate("HomePage")
      }
   }

   return (

      <View style={tw`  h-[100%] `}>
         <Navbar />
         <ScrollView>
            <View>
               <Text style={{ fontFamily: 'MadimiOne', fontSize: 28, marginLeft: 15, marginTop: 20 }}>
                  Craft a concise, engaging bio showcasing your professional journey succinctly.
               </Text>
               <Text style={{ fontFamily: "TwinkleStar", fontSize: 18, marginTop: 10, marginLeft: 15 }} >
                  Compose a compelling professional biography, where your journey unfolds through eloquent prose. Infuse passion, expertise, and purpose into each word,
               </Text>
               <View>

                  {/*input */}
                  <TextInput
                     value={value}
                     onChangeText={(text) => {
                        setValue(text)
                     }}
                     multiline
                     lineHeight={50}
                     numberOfLines={8}
                     placeholder='Please share your skills and experiences, highlighting key achievements and expertise relevant to your profession.'
                     style={tw`w-10/12 mt-6  min-h-[10rem]     ml-2 border border-b-1 rounded-xl p-3 border-gray-200`}
                     textAlignVertical="top"
                  />

               </View>

               {/*spinner*/}
               <Spinner
                  visible={loading}

               />
            </View>
            <View style={tw`mt-20 border border-gray-300 rounded-2xl w-11/12 mx-auto flex  gap-5 p-2`}>
               <View>
                  <Image source={image} style={[tw` mt-7 mx-auto rounded-full`, { width: 130, height: 130 }]} />
                  <Text style={[tw`font-MadimiOne mx-auto text-xl mt-2`, { fontFamily: 'MadimiOne' }]}>Dimitri P.</Text>
                  <Text style={[tw` text-lg mx-auto `, { fontFamily: 'MadimiOne ' }]}>Full Stack developer</Text>
               </View>
               <View >
                  <Text style={[tw` max-w-[98%] text-[17px] mx-auto`, { fontFamily: 'TwinkleStar' }]}>As a proficient MERN stack developer, I specialize in building dynamic web applications leveraging MongoDB for flexible data storage, Express.js for seamless server-side operations, React.js for engaging user interfaces, and Node.js for efficient backend functionality.</Text>
                  <View >
                     <Text style={[tw`mx-auto mt-4 text-[16px] ml-3`, { fontFamily: 'TwinkleStar' }]}>&#8226; I excel in leveraging MongoDB for flexible data storage.</Text>
                     <Text style={[tw`mx-auto mt-3 text-[16px] ml-3`, { fontFamily: 'TwinkleStar' }]}>&#8226; I employ Express.js for seamless server-side operations.</Text>
                     <Text style={[tw`mx-auto mt-3 text-[16px]  ml-3`, { fontFamily: 'TwinkleStar' }]}>&#8226; I create engaging user interfaces with React.js.</Text>
                     <Text style={[tw`mx-auto mt-3 text-[16px] ml-3`, { fontFamily: 'TwinkleStar' }]}>&#8226; I ensure efficient backend functionality using Node.js.</Text>
                  </View>
               </View>
            </View>


         </ScrollView>
         <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity>
               <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
               <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Finish</Text>
            </TouchableOpacity>
         </View>
      </View>

   )
}

export default UserBio
