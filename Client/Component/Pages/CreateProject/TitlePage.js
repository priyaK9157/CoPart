import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import tw from "twrnc"
import { useFonts } from 'expo-font'
import Footer from '../../Common/Footer'
import Navbar from '../../Common/Navbar'
import { updateStep, updateTitle } from '../../../reducers/CreateProject'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message'

const TitlePage = () => {
    const { step } = useSelector((state) => state.createProject);
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [fontsLoaded] = useFonts({
        MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
        TwinkleStar: require('../../../assets/Fonts/-W_oXI_oSymQ8Qj-Apx3HGN_Hu1RTCk5FtSDETgf0cK_NOeFgpRt9rN5.ttf'),
    });

    const setTitleState = () => {
        if (!data) {
            Toast.show({
                type: 'error',
                text1: 'Please Fill All The Details To Proceed',
                position: 'bottom',
              });
                return;
            return;
        }
        setLoading(true);
        console.log("data",data);
        dispatch(updateTitle(data));
        dispatch(updateStep(2));
        setLoading(false);
    }

    return (
        <View style={tw`h-[100%]`}>
            <Navbar header="Create Project"/>
            <View style={tw` mt-15 w-11/12 mx-auto  `}>
                <View style={tw` flex flex-row  gap-4`}>
                    <Text style={tw` text-slate-500`}>{step}/5</Text>
                    <Text style={[tw` text-md`,{ fontFamily: "MadimiOne" }]}>Job Post</Text>
                </View>
                <Text style={[tw` mt-7 text-2xl `,{ fontFamily: "MadimiOne" }]}>Let's Start with a beautiful Title.</Text>
                <Text style={[tw` mt-3 max-w-[90%] `,{ fontFamily: "" }]}>Help your job post stand out: Suggest a project title in 20 words or less. Be concise and creative!</Text>
                <TextInput
                    onChangeText={(e) => {
                        setData(e);
                    }}
                    placeholder='Write a Title For Your Project'
                    style={tw` mt-4 w-11/12  border border-b-1 rounded-xl p-2 border-gray-300`}
                />
                <Text style={[tw` mt-7 text-xl `,{ fontFamily: "MadimiOne" }]}>Example Title</Text>
                <Text style={[tw` mt-2 text-[17px]`,{ fontFamily: "TwinkleStar" }]}>1. Echo: Amplifying Voices in the Workplace"</Text>
                <Text style={[tw` mt-2 text-[17px]`,{ fontFamily: "TwinkleStar" }]}>2. NexGenTalent: Innovating Recruitment Solutions</Text>
                <Text style={[tw` mt-2 text-[17px]`,{ fontFamily: "TwinkleStar" }]}>3. VoxPop: Revolutionizing Job Posting Engagement</Text>
            </View>
            {/*spinner*/}
            {/* <Spinner visible={loading}/> */}
            <View style={tw` flex-1 justify-end `}>
                <View style={{ borderTopWidth: 5, borderTopColor: '#E5E7EB',padding:17,display:'flex',flexDirection:'row-reverse', justifyContent:'space-between' }}>
                    <TouchableOpacity onPress={setTitleState}>
                        <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Next:Skills</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default TitlePage;
