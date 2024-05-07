import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc";
import RNRestart from 'react-native-restart';

const Navbar = ({ header }) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);

  };

  function reloadWindow(){
       //reload window
      RNRestart?.Restart()
      console.log("data",RNRestart)
       setRefresh(!refresh)
  }

  return (
   <View>
             <View style={[tw`border-gray-200 border-b-[3px]  p-4  flex flex-col  w-full mt-3`]}>
               <View style={tw` flex flex-row`}>
                     <Text style={[tw`mx-auto flex font-semibold text-xl mt-3`]}>{header ? header : 'Create Your Profile'}</Text>
                     <TouchableOpacity style={tw`mt-3`} onPress={handleRefresh} >
                     <Ionicons name="ellipsis-vertical" size={24} color="black" />
                     </TouchableOpacity>
               </View>
            </View>
            {
                refresh===true && (
                  <TouchableOpacity style={tw`  p-4 ml-[58%] -mt-[4%] bg-white w-[60%] shadow-xl`}  onPress={reloadWindow}>
                     <Text style={tw`font-semibold `}>Refresh</Text>
                  </TouchableOpacity>
                )
            }
   </View>
  );
};

export default Navbar;
