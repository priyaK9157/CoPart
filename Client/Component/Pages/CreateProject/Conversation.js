import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import tw from "twrnc";
import Navbar from '../../Common/Navbar';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';
import { createProjectHandler } from '../../../services/operations/ProjectsHandler';
import { useNavigation } from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from "../../../services/operations/generate&verifyOTP";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const Conversation = () => {
  const { step, title, skills, BasicDetail } = useSelector((state) => state.createProject);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigation();
  const maxLength = 150;

  const handleDescriptionChange = (text) => {
    if (text.length <= maxLength) {
      setDescription(text);
    }
  };

  const charactersLeft = maxLength - description.length;

  async function PostAJob() {
    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill All The Details To Proceed',
        position: 'bottom',
      });
        return;
    }
    const allKeys = await AsyncStorage.getAllKeys();

    const allItems = await AsyncStorage.multiGet(allKeys);
    let token;
    for (const [key, value] of allItems) {
        if (key === 'token') {
            token = value;
            break;
        }
    }
    setLoading(true)
    const decodedEmail = await DecodedTokenHandler(token);
    const data = {
      Email: decodedEmail.data.Email,
      projectName: title,
      BasicDetail,
      Skill: skills,
      projectDescription: description
    }
    const response = await createProjectHandler(data);
    setLoading(false);
    Navigate.navigate("JobPage");
  }
  return (
    <View>
      <Navbar />

      <ScrollView vertical style={tw`w-11/12 mx-auto mt-6 h-[77%]`}>
        {/* Content here */}
        <View style={tw`flex flex-row gap-4 mt-6 ml-2`}>
          <Text style={tw`text-slate-500`}>{step}/5</Text>
          <Text style={[tw`text-md`, { fontFamily: "MadimiOne" }]}>Job Post</Text>
        </View>

        <Text style={[tw`mt-7 text-2xl`, { fontFamily: "MadimiOne" }]}>Begin the conversation.</Text>
        <Text style={tw`mt-4 text-lg`}>What talents are you seeking:</Text>
        <Text style={tw`mt-2 ml-2 text-[15px]`}>
          <Text style={tw`text-xl font-bold`}>·</Text> Be clear about what you need to be done.
        </Text>
        <Text style={tw`mt-2 ml-2 text-[15px]`}>
          <Text style={tw`text-xl font-bold `}>·</Text>What abilities individuals are after:
        </Text>
        <Text style={tw`mt-2 ml-2 text-[15px]`}>
          <Text style={tw`text-xl font-bold`}>·</Text>Provide clear expectations for your tasks or objectives.
        </Text>
        <Text style={[tw`mt-7 text-xl`, { fontFamily: "MadimiOne" }]}>Describe what you need</Text>
        {/* {/spinner/} */}
        <Spinner visible={loading} />
        <TextInput
          multiline
          numberOfLines={13}
          placeholder='Already have a description? Paste it here!'
          style={tw`border-2 border-gray-300 rounded-xl mt-3 p-3`}
          textAlignVertical="top"
          onChangeText={handleDescriptionChange}
          value={description}
          maxLength={maxLength}
        />
        <Text style={[tw`text-red-700 text-right`, { fontFamily: "MadimiOne" }]}>{charactersLeft} character's left</Text>
      </ScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={PostAJob} >
          <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Post A Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Conversation;