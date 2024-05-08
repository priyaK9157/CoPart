import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import emailImage from "../../../assets/Blog-97-email-marketing.png"
import tw from "twrnc"
import { Text,TextInput } from 'react-native'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DecodedTokenHandler, generateOTP } from '../../../services/operations/generate&verifyOTP'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { updateEmail } from '../../../reducers/Updatepassword'
import { useDispatch } from 'react-redux'

const UpdatePaswordStep1 = () => {
 
  const[userEmail,setUserEmail]=useState();
  const navigation=useNavigation()
  const dispatch=useDispatch();
  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../../assets/Fonts/pe0pMI6IL4dPoFl9LGEmY6WaA_Rue1UwVg.ttf'),
  });
  
  async function getUserEmail(){
    //destruct token
    const token = await AsyncStorage.getItem('token');
    //find email
    const decodedEmail=await DecodedTokenHandler(token);
    setUserEmail(decodedEmail.data.Email)
  }

  async function sendOtpToUser(){
     
     dispatch(updateEmail(userEmail))
     const sendingMailResponse=await generateOTP(userEmail,"Update_Password");
    
     if(sendingMailResponse){
          navigation.navigate("updatepasswordstep2")
     }
  }
  useEffect(()=>{
       getUserEmail();
  },[])

  return (
    <View style={tw` h-[100%] w-[100%] mt-10 `}>
          <View style={tw`w-11/12 mx-auto  `}>
              <Image source={emailImage} style={[tw` mx-auto`,{ width: 200, height: 200 }]} />
              <Text style={[tw`mx-auto mt-10 text-xl`,{fontFamily:"MadimiOne"}]}>Update Your Password</Text>
              <Text style={[tw` mt-4 mx-auto mt-10 text-lg`,{fontFamily:"TwinkleStar"}]} >Kindly furnish your email address for the purpose of<Text style={tw`font-bold`}> sending the email.</Text></Text>
              <View>
                    <Text style={tw`font-bold text-lg mt-4 ml-2` }>Email</Text>
                    <TextInput
                      onChangeText={(text) => {
                          setUserEmail(text);
                      }}
                      value={userEmail}
                      style={tw`w-12/12 mt-3   mx-auto border-2 border-b-1 rounded-xl p-2 border-gray-400`}
                    />
              </View>
           </View>
           <View style={tw`  mt-44 `}>
                <View style={{ borderTopWidth: 5, borderTopColor: '#E5E7EB',padding:17,display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
                  <TouchableOpacity onPress={()=>{
                    navigate?.navigate("Login")
                  }}>        
                          <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={sendOtpToUser} >
                      <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Send Email</Text>
                  </TouchableOpacity>
              </View>
          </View>
    </View>
  )
}

export default UpdatePaswordStep1