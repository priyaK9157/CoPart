import React, { useEffect, useState } from 'react'
import { View,Text, Image } from 'react-native'
import tw from "twrnc"
import Navbar from '../Common/Navbar'
import { Entypo ,Ionicons,Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { GetRecentAlert, Recent10Alert } from '../../services/operations/AlertHandler';
import cancel from "../../assets/cancel.png"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MainFooter from "../../Component/Common/MainFooter"
import notificationImage from "../../assets/undraw_Fresh_notification_re_whq4.png"


const Alert = () => {
    
    const[RecentData,setRecentData]=useState([]);
    const[mostEarlierData,setMostEarlierData]=useState([]);
    const[ifRecentNull,setIfRecentNull]=useState();

    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
    });

    // find recent notification alert
    async function getRecentAlerts(){
        const RecentAlertData=await GetRecentAlert();
        if(RecentAlertData?.message=="No recent alerts found."){
            setIfRecentNull(true)
        }
        setRecentData(RecentAlertData.response);
    }

    async function getEarlierAlerts(){
        const EarlierAlertData=await Recent10Alert();
        console.log("earliets",EarlierAlertData)
        setMostEarlierData(EarlierAlertData.response);
    }

    const removeAlert = (indexToRemove) => {
        setRecentData(prevData => prevData.filter((_, index) => index !== indexToRemove));
    };
    
    const remove10Alert = (indexToRemove) => {
        setMostEarlierData(prevData => prevData.filter((_, index) => index !== indexToRemove));
    };
    useEffect(()=>{
        getRecentAlerts()
        getEarlierAlerts();
    },[])


  return (
    <View style={tw`w-[100%] h-[100%]`}>
         <Navbar header="Alert"/>
         <View style={tw`w-11/12 mx-auto`}>
                <View style={tw` mt-3  bg-red-200 p-5 rounded-2xl flex flex-col shadow-xl`}>
                            <View style={tw` flex flex-row gap-3  `}>
                                <Feather name="alert-triangle" size={24} color="#ef4444" />
                                <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>Kindness knows no bounds. Respect every soul you encounter here. Our community thrives on mutual respect and understanding.</Text>
                            </View>
                            <View style={tw` flex flex-row gap-3  mt-3 items-center`}>
                                    <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#0d9488" />
                                    <Text style={[tw` text-slate-700 max-w-[90%]`,{fontFamily:"MadimiOne"}]}>WorldWide</Text>
                            </View>
                </View>
               
                <ScrollView style={tw` h-[60%]`}>
                     {/*most recent*/}
                    <Text style={[tw` mt-4 text-2xl`,{fontFamily:"MadimiOne"}]}>Most Recent</Text>

                    <View>
                                {
                                  ( RecentData.length==0 || ifRecentNull===true ) ? (
                                        <View style={tw` bg-red-100 p-10 mt-3 rounded-2xl flex flex-row`}>
                                             <Text style={[tw`text-3xl`,{fontFamily:"MadimiOne"}]}>No new notifications</Text>
                                        </View>
                                ) : (
                                    <View style={tw` mt-4 w-11/12 mx-auto`}>
                                            {
                                                RecentData.map((data,index)=>{
                                                    const timestamp = data.timestamp; 
                                                    const date = new Date(timestamp);

                                                    // Format the date (including day, month, and year)
                                                    const options = {  day: 'numeric', month: 'long'};
                                                    const formattedDate = date.toLocaleDateString('en-US', options);

                                                return  <View>
                                                            <View key={index} style={tw` flex flex-row gap-3 max-w-[70%] p-2 pb-3 mt-2 justify-between `}>
                                                                        <Feather name="user" size={24} color="black" />
                                                                        <View style={tw` flex flex-col gap-2`}>
                                                                            <Text style={{fontFamily:"MadimiOne"}}>{data.message}</Text>
                                                                            <Text  style={{fontFamily:"MadimiOne"}} >{formattedDate}</Text>
                                                                        </View>
                                                                    <TouchableOpacity onPress={() => removeAlert(index)} >
                                                                        <Image source={cancel} style={[tw`h-7 w-7 `,{tintColor:"#15803d"}]}  />
                                                                    </TouchableOpacity>
                                                                    
                                                            </View>
                                                            <Text style={tw`border-2 border-slate-200 h-1`}></Text>
                                                </View>
                                                })
                                            }
                                    </View>
                                )
                            }
                    </View>
                    
                    {/*most earlier*/}
                    <Text style={[tw` mt-4 text-2xl`,{fontFamily:"MadimiOne"}]}>Most Earlier</Text>
                    <View>
                                {
                                (mostEarlierData.length===0 || mostEarlierData===true) ? (
                                        <View style={tw` bg-red-100 p-10 mt-3 rounded-2xl`}>
                                             <Text style={[tw`text-3xl`,{fontFamily:"MadimiOne"}]}>No new notifications</Text>
                                        </View>
                                ) : (
                                    <View style={tw` mt-4 w-11/12 mx-auto`}>
                                            {
                                                mostEarlierData.map((data,index)=>{
                                                    const timestamp = data.timestamp; 
                                                    const date = new Date(timestamp);

                                                    // Format the date (including day, month, and year)
                                                    const options = {  day: 'numeric', month: 'long'};
                                                    const formattedDate = date.toLocaleDateString('en-US', options);

                                                return  <View>
                                                            <View key={index} style={tw` flex flex-row gap-3 max-w-[70%] p-2 pb-3 mt-2 justify-between `}>
                                                                        <Feather name="user" size={24} color="black" />
                                                                        <View style={tw` flex flex-col gap-2`}>
                                                                            <Text style={{fontFamily:"MadimiOne"}}>{data.message}</Text>
                                                                            <Text  style={{fontFamily:"MadimiOne"}} >{formattedDate}</Text>
                                                                        </View>
                                                                     <TouchableOpacity onPress={()=>remove10Alert(index)}>
                                                                     
                                                                        <Image source={cancel} style={[tw`h-7 w-7 `,{tintColor:"#15803d"}]} />
                                                                       
                                                                    </TouchableOpacity>
                                                                    
                                                            </View>
                                                            <Text style={tw`border-2 border-slate-200 h-1`}></Text>
                                                </View>
                                                })
                                            }
                                    </View>
                                )
                            }
                    </View>

                </ScrollView>

            
         </View>
         <MainFooter/>
    </View>
  )
}

export default Alert