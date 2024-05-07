import { View,Text, Image } from 'react-native'
import React from 'react'
import tw from "twrnc"
import image1 from '../../assets/logo.jpg'

const CommonFirst = () => {
  return (
    <View  style={tw` h-[100%] w-[100%] items-center justify-center bg-white`}>
         <Image source={image1}/>
    </View>
  )
}

export default CommonFirst