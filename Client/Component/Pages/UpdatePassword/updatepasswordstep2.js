import React ,{useState} from 'react'
import { View ,Text} from 'react-native'
import tw from "twrnc"
import emailsentImage from "../../../assets/emailsent.jpg"
import { useFonts } from 'expo-font';
import OTPTextInput from 'react-native-otp-textinput'; 
import { Image } from 'react-native'
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { verifyOTP } from '../../../services/operations/generate&verifyOTP';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const updatepasswordstep2 = () => {
    const [otp, setOtp] = useState('');
    const [passwordMatch,setPasswordmatch]=useState(true);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigation();
    const{email}=useSelector((state)=>state.updatepassword)
    const [fontsLoaded] = useFonts({
        MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
        TwinkleStar: require('../../../assets/Fonts/pe0pMI6IL4dPoFl9LGEmY6WaA_Rue1UwVg.ttf'),
      });
 

    const handleOTPChange = (code) => {
    setOtp(code);
    };
      
  const handleVerifyOtp = async (e) => {
    setLoading(true);
    const response = await verifyOTP(email, otp);
    setLoading(false);
    if (response.data.matched ===true) {
      navigate.navigate?.('updatepasswordstep3');
    } else{
       setPasswordmatch(false)
    }
  };

  return (
    <View style={tw`bg-white h-[100%]`}>
         <View style={tw`w-11/12 mx-auto mt-20 `}>
             <Image source={emailsentImage} style={[tw`mx-auto`,{width:200,height:200}]}/>
             <Text style={[tw`mx-auto mt-10 text-xl`,{fontFamily:"MadimiOne"}]}>Email Sent!</Text>
             <Text style={[tw` mt-4 mx-auto mt-4 text-lg`,{fontFamily:"TwinkleStar"}]}>Your journey awaits in our <Text style={tw`font-bold`}>email with an OTP .</Text>  Enter it,<Text style={tw`font-bold`}> press continue</Text>, and update your password for seamless security.</Text>
             <OTPTextInput
                handleTextChange={handleOTPChange}
                containerStyle={[tw`ml-4`,{ width: '80%', height: 200 }]}
                textInputStyle={{ width: 60, height: 60, borderBottomWidth: 1 }}
                tintColor="green"
                offTintColor="black"
                keyboardType="numeric"
            />
         </View>
         {
            passwordMatch === false && (
              <Text style={[tw`text-red-700  pb-2`, { fontFamily: "MadimiOne" }]}>Otp Dosen't Match</Text>
            )
          }
         <TouchableOpacity onPress={handleVerifyOtp} style={tw`mx-auto bg-green-500 w-[80%] p-5 rounded-full`}>
             <Text style={tw`text-white font-bold mx-auto`}>Log In</Text>
         </TouchableOpacity>
    </View>
  )
}

export default updatepasswordstep2