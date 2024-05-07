// CommonSkillPage.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import tw from 'twrnc';
import SkillButton from '../SkillButton';
import { SkillRequired } from '../../../ArrayUsable/SkillsRequired';
import Spinner from 'react-native-loading-spinner-overlay';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CommonSkillPage = ({ title, updateStep, updateSkills,button2text,navigateRef }) => {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [selectedButton, setSelectedButton] = useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigation()

  const setSkillState = () => {
    if (selectedButton.length <= 2) {
      // Handle error
      return;
    }
    setLoading(true);
    updateStep(3);
    updateSkills(selectedButton);
    setLoading(false);

    if(navigateRef){
        navigate.navigate(navigateRef)
    }
  };

  return (
    <View style={tw`h-[100%]`}>
      <Navbar title={title} />
      <View style={tw`w-11/12 mx-auto mt-6`}>
        <Text style={[tw`mt-7 text-3xl`, { fontFamily: 'MadimiOne' }]}>Choose Your Favorite Skills!</Text>
        <TextInput
          value={skillInput}
          onChangeText={(text) => setSkillInput(text)}
          onSubmitEditing={(event) => {
            const skill = event.nativeEvent.text;
            if (skill.trim() !== '') {
              setSelectedButton((prevSelectedSkills) => [...prevSelectedSkills, skill]);
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
        {/* Spinner */}
        <Spinner visible={loading} />
      </View>
      <View style={{marginTop: 70,borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setSkillState} >
          <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>{button2text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonSkillPage;
