import React, { useState,useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Linking,ActivityIndicator } from 'react-native';
import tw from "twrnc";
import MainHeader from '../Common/MainHeader';
import { successArray } from "../../ArrayUsable/SucessStoryArray"
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import MainFooter from '../Common/MainFooter';
import Swiper from "react-native-swiper"
import { useNavigation } from '@react-navigation/native';
import image1 from '../../assets/logo.jpg'

const HomePage = () => {

    const [fontsLoaded] = useFonts({
        MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
        TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
    });
    const navigation=useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false); 
        }, 6000); 

        return () => clearTimeout(delay); 
    }, [fontsLoaded])
     console.log("is",isLoading,fontsLoaded)
    if (!fontsLoaded || isLoading) {
        return (
            <View style={tw` h-[100%] w-[100%] items-center justify-center bg-white`}>
                <Image source={image1}/>
            </View>
        );
    }
    const handleItemClick = (redirectUrl) => {
        Linking.openURL(redirectUrl);
    };

    return (
        <View style={tw`w-full h-full bg-white relative`}>
            <MainHeader mainName="CoPartner" nameHeader="" icon1="" icon2="notifications" />
            <ScrollView style={tw`flex-1`}>
                <View style={tw`w-10/12 mx-auto`}>
                    <Text style={[tw` text-lg`, { fontFamily: "MadimiOne" }]}>Tech Stories Simplified</Text>
                  
                    <View style={tw`mt-8 gap-6 border-b-2 border-gray-200 pb-6`}>
                        {successArray.map((data, index) => (
                            <TouchableOpacity key={index} onPress={() => handleItemClick(data.redirect)}>
                                <Image style={tw` h-[14rem] w-[19rem] border border-gray-200 rounded-xl`} source={data.images} />
                                <Text style={[tw`text-green-800 text-lg mt-2`, { fontFamily: 'MadimiOne' }]}>{data.heading}</Text>
                                <View style={tw`flex flex-row mt-2 flex-wrap gap-3`}>
                                    {data.tags.map((tag, index) => (
                                        <View key={index}>
                                            <Text style={tw`bg-white border border-gray-200 px-4 py-2 rounded-2xl text-gray-400 font-bold`}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <MainFooter />
        </View>
    );
}

export default HomePage;
