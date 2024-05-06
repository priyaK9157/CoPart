import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import SkillButton from '../../Common/SkillButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { SkillRequired } from '../../../ArrayUsable/SkillsRequired';
import { UpdateProfile } from "../../../services/operations/ProfileHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import { FindByEmail } from "../../../services/operations/ProfileHandler";
import { Feather } from '@expo/vector-icons';

const CommonSkillPage = () => {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [selectedButton, setSelectedButton] = useState([]);

  async function updatetitle() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const decodedEmail = await DecodedTokenHandler(token);
      const Email = decodedEmail.data.Email;
      const User_Profile = await FindByEmail(Email);
  
      User_Profile.data.response.Skills = selectedButton; 
      await UpdateProfile({ data: User_Profile.data.response });
      setLoading(false);
      navigation.navigate('Profile');
    } catch (error) {
      setLoading(false);
      console.error('Error updating skills:', error);
    }
  }
  

  return (
    <View style={tw`h-[100%] m-3 mt-12`}>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
     
      <View style={tw`w-11/12 mx-auto mt-6`}>
        <Text style={[tw`mt-7 text-3xl`, { fontFamily: 'MadimiOne' }]}>Choose Your Favorite Skills!</Text>
        <TextInput
          value={skillInput}
          onChangeText={(text) => setSkillInput(text)}
          onSubmitEditing={(event) => {
            const skill = event.nativeEvent.text;
            if (skill.trim() !== '') {
              setSelectedButton([skill]); 
              setSkillInput('');
            }
          }}
          placeholder="Search or add up to 10 skills"
          style={tw`mt-4 w-11/12 border border-b-1 rounded-md p-2 border-gray-300`}
        />
        <ScrollView style={tw`h-[47%]`}>
          {selectedButton.length > 0 && (
            <View>
              <Text style={[tw`mt-7 text-xl`, { fontFamily: 'MadimiOne' }]}>Your Selected Skills</Text>
              <View style={tw`flex flex-row max-w-[97%] gap-1 flex-wrap`}>
                {selectedButton.map((data, index) => (
                  <SkillButton key={index} text={data} setSelectedButton={setSelectedButton} selectedButton={selectedButton} flag="true" />
                ))}
              </View>
            </View>
          )}
          <Text style={[tw`mt-7 text-xl`, { fontFamily: 'MadimiOne' }]}>Popular Skills For Full Stack Developer</Text>
          <View style={tw`flex flex-row max-w-[97%] gap-1 flex-wrap`}>
            {SkillRequired.filter((skill) => !selectedButton.includes(skill.name)).map((data, index) => (
              <SkillButton key={index} text={data.name} setSelectedButton={setSelectedButton} selectedButton={selectedButton} flag="false" />
            ))}
          </View>
        </ScrollView>
        <Spinner visible={loading} />
      </View>
      <View style={{ marginTop: 70, borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={tw`mt-4 mx-auto mb-8 border-t border-gray-300 w-full`}>
        <TouchableOpacity onPress={updatetitle}>
          <Text style={tw`bg-green-600 p-3 px-6 rounded-full text-white font-bold text-center`}>Save</Text>
        </TouchableOpacity>
    </View>
      </View>
    </View>
  );
};

export default CommonSkillPage;
