import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput'; // Import OTPTextInput
import tw from 'twrnc';
import { useFonts } from 'expo-font';
import { verifyOTP } from '../../services/operations/generate&verifyOTP';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../Common/Navbar'
import { generateOTP } from '../../services/operations/generate&verifyOTP';
import Spinner from 'react-native-loading-spinner-overlay';

const Verification = () => {
  const [otp, setOtp] = useState('');
  const[loading,setLoading]=useState(false);
  const navigate = useNavigation();
  const { data } = useSelector((state) => state.signup);
  console.log("data",data)
  const handleOTPChange = (code) => {
    setOtp(code);
  };

  const email = data.Email;

  const [fontsLoaded, error] = useFonts({
    MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
    TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
  });

  if (error) {
    console.log("Font loading error:", error);
  }

  if (!fontsLoaded) {
    return null; // Or render a loading indicator
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await verifyOTP(email, otp);
    setLoading(false);
    if (response.data.matched ===true) {
      navigate.navigate?.('ProfessionalInfo');
    } else{
       alert("Otp Dosen't Match")
    }
  };

  const handleResend = async (e) => {
    try {
      e.preventDefault();
      const response = await generateOTP(email);
      console.log("res", response)
      if (response.statusText === 'OK') {
        console.log('Verification email resent successfully.');
      } else {
        console.error('Failed to resend verification email:', response.error);
      }
    } catch (error) {
      console.error('Error resending verification email:', error.message);
    }
  };

  return (
    <View style={[tw`flex mx-auto justify-between items-center`,{ fontFamily: 'TwinkleStar' }]}>
    <Navbar/>
      <Text style={[tw`text-xl max-w-[90%] pt-10`, { fontFamily: 'TwinkleStar' }]}>
        We need to verify your email address. We have sent an email containing a <Text style={tw` font-bold`}>6-digit code</Text> which <Text style={tw` font-bold`}>Expires In 5 Minute</Text> . Please enter the code below:
      </Text>
      <OTPTextInput
        handleTextChange={handleOTPChange}
        containerStyle={{ width: '80%', height: 200 }}
        textInputStyle={{ width: 60, height: 60, borderBottomWidth: 1 }}
        tintColor="green"
        offTintColor="black"
        keyboardType="numeric"
      />
       <Spinner
                visible={loading}
              
              />
      <TouchableOpacity style={tw`bg-green-600 px-13 py-2 rounded-3xl mb-10 `} onPress={handleVerifyOtp}>
        <Text style={tw`text-white text-base font-semibold mx-auto`}>Continue</Text>
      </TouchableOpacity>
      <Text style={[tw`text-base  max-w-[80%]`, { fontFamily: 'TwinkleStar' }]}>Don't receive the email? Try checking your junk and spam folders. <Text style={tw`font-bold text-xl text-green-500 underline`} onPress={handleResend}>Resend</Text></Text>

    </View>
  );
};

export default Verification;