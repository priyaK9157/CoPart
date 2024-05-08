import { View,Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Feather,AntDesign} from '@expo/vector-icons';
import {useFonts} from "expo-font"
import { SearchArray } from '../../ArrayUsable/SerachArray';
import { useDispatch } from 'react-redux';
import { updateSelectedValue } from '../../reducers/SearchData';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const[dataSelected,setDataSeleted]=useState();
  const dispatch=useDispatch();
  const navigate=useNavigation();

  const [fontsLoaded] = useFonts({
    MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
    TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
  }); 

  const storeData=async(value)=>{
      setDataSeleted(value)
      dispatch(updateSelectedValue(value))
      navigate.navigate("JobPage")
  }



  return (
    <View>
         <View style={tw`flex flex-row items-center pt-10 m-5`}>
                        <TouchableOpacity onPress={()=>navigation.navigate('HomePage')}>
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={[tw`text-2xl ml-2`, { fontFamily: "MadimiOne" }]}>Search</Text>
           </View>
           <View style={tw`w-11/12 mx-auto`}>
              <View style={[tw`flex flex-row items-center gap-3`, { position: 'relative' }]}>
                    <AntDesign name="search1" size={24} color="black" style={tw`text-[1.8rem]`} />
                  <TouchableOpacity >
                      <TextInput
                          value={dataSelected}
                          onChangeText={(text) =>storeData(text)}
                          placeholder='Search for Projects'
                          style={[tw`relative text-[1.2rem] `, { fontFamily: '' }]}
                      />
                  </TouchableOpacity>
                </View>
               
               <View style={tw` mt-6`}>
                      {
                         SearchArray.slice(0,4).map((data,index)=>{
                          return <TouchableOpacity onPress={()=>{
                            storeData(data)
                          }} key={index}>
                                     <Text style={[tw` mt-4 text-xl`,{fontFamily:"MadimiOne"}]}>{data}</Text>
                          </TouchableOpacity>
                         })
                      }
               </View>
           </View>
    </View>
  )
}

export default SearchPage