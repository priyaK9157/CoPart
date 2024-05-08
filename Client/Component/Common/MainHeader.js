import React from 'react';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc"
import image1 from "../../assets/logo.jpg"
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MainHeader = ( {mainName, icon1, icon2} ) => {
   
    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
      });
    const navigate=useNavigation();

  return (
    <View style={tw` w-10/12 mx-auto mt-10 bg-white flex flex-row justify-between items-center mb-7 `}>
         <View>
             <Text style={[tw`  text-3xl  text-green-500`,{fontFamily:'MadimiOne'}]}>{mainName}</Text>
         </View>
          <View>
          <View style={tw`flex flex-row  gap-6`}>
                 <Ionicons name={icon1} size={24} color="green" />
                <TouchableOpacity onPress={()=>{
                   navigate?.navigate("Alert")
                }}>
                      <Ionicons name={icon2} size={24} color="green"/>
                </TouchableOpacity>
                
               </View> 
          </View>
    </View>
  );
};

export default MainHeader;
