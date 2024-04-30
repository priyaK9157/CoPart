import React from 'react'
import { View ,Text, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import {useDispatch} from "react-redux"
import { useNavigation } from '@react-navigation/native'
// import ToastManager, { Toast } from 'toastify-react-native'

const Footer = ({button1Text,button2Text,reducerName,data,navigate,button1Navigate}) => {
  const dispatch= useDispatch();
  const navigation=useNavigation();

  async function handlePress(e){
    e.preventDefault();
     if(data===''){
      // Toast.error("All Field Are Mandatory")
      return;
     }
      dispatch(reducerName(data));
      navigation?.navigate(navigate)
  }
 console.log("button1",button1Navigate)
  return (
    <View style={tw` flex-1 justify-end `}>
        <View style={{ borderTopWidth: 5, borderTopColor: '#E5E7EB',padding:17,display:'flex',flexDirection:'row', justifyContent:'space-between' }}>
            <TouchableOpacity onPress={()=>{
               navigation?.navigate(button1Navigate)
            }}>
                 {
                  button1Text && (
                    <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>{button1Text}</Text>
                  )
                 }
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
                 <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>{button2Text}</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Footer