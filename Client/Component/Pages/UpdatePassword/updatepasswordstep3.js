import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import tw from "twrnc";
import Checkbox from 'expo-checkbox';
import Navbar from '../../Common/Navbar';
import Toast from 'react-native-toast-message';
import {UpdatePassword} from "../../../services/operations/ProfileHandler"
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const UpdatePasswordStep3 = () => {
  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../../assets/Fonts/pe0pMI6IL4dPoFl9LGEmY6WaA_Rue1UwVg.ttf'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); 
  const{email}=useSelector((state)=>state.updatepassword)
  const navigation=useNavigation();



  const handleCheckboxClick = () => {
    setIsChecked(!isChecked); 
    setShowPassword(!showPassword);
  };

  const handleSubmit = async() => {
    const containsNumber = /\d/.test(newPassword);
    const containsSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

    if (newPassword === confirmPassword) {
      if (containsNumber || containsSymbol) {
             Toast.show({
                type: 'error',
                text1: 'Password should not contain numbers or symbols',
                position: 'bottom',
            });
              return;
      } else {
         const response=await UpdatePassword(email,newPassword);
         console.log("response",response);
         Toast.show({
            type:"success",
            text1:"Password Update SuccessFully",
            position:"bottom"
         })
         navigation.navigate("Login");

      }
    } else {
        Toast.show({
          type:"error",
          text1:"Password and Confirm Password Dosen't Matches",
          position:"bottom"
      })
     return;
    }
  };

  return (
    <View style={tw`h-[100%] w-[100%]`}>
      <Navbar header="Update Password"/>

      <View style={tw`w-11/12 mx-auto`}>
        <View style={tw`mt-20`}>
          <View style={tw`w-11/12 mx-auto flex flex-row justify-between`}>
            <Text style={[tw`ml-4 text-[16px]`, { fontFamily: "MadimiOne" }]}>New Password</Text>
            <View style={tw`flex flex-row gap-2 items-center`}>
              <Checkbox
                value={isChecked}
                onValueChange={handleCheckboxClick}
              />
                <Text>Show Password</Text>
            </View>
          </View>
          <TextInput
            style={tw`w-11/12 mt-3 mx-auto border-2 border-b-1 rounded-xl p-2 border-gray-400`}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <View style={tw`mt-3`}>
            <Text style={[tw`text-[16px] text-slate-700`, { textAlign: 'right' }]}>× Numbers × Symbols</Text>
          </View>
        </View>
        <View style={tw`w-11/12 mx-auto flex mt-5 justify-between`}>
          <Text style={[tw`text-[16px]`, { fontFamily: "MadimiOne" }]}>Confirm New Password</Text>
          <TextInput
            style={tw`w-12/12 mt-3 mx-auto border-[2px] border-b-1 rounded-xl p-2 border-gray-400`}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <View style={tw`flex-1 justify-end`}>
        <View style={{ borderTopWidth: 5, borderTopColor: '#E5E7EB', padding: 17, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Login")
          }}>
            <Text style={tw`border border-gray-300 p-2 rounded-full px-5`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={tw`bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

export default UpdatePasswordStep3;
