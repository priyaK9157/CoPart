// GetStarted.js
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import office from "../assets/office1.jpg";
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation?.navigate('Signup');
  };
  return (
    <ImageBackground source={office} style={tw`flex-1`}>
      <View style={[tw`flex-1 gap-2 w-11/12 mx-auto justify-end p-3`, { paddingBottom: 100 }]}>
        <Text style={tw`flex text-[32px] text-white font-poppin`}>
          Hey People Welcome to <Text style={tw`text-[#AAFF9E]`}>CoPartner</Text>
        </Text>
        <Text style={tw`text-slate-100 text-lg max-w-[98%]`}>
          Forgot the old rules. You can have the best People Right Now. Right here
        </Text>
        <TouchableOpacity style={[tw`bg-[#AAFF9E] p-5 rounded-full`, { transform: [{ translateY: 15 }] }]} onPress={handlePress}>
          <Text style={tw`text-black mx-auto font-semibold`}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default GetStarted;
