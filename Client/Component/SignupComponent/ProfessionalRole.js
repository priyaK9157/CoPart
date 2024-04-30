import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import tw from 'twrnc';
import Navbar from '../Common/Navbar';
import { useFonts } from 'expo-font';
import Footer from '../Common/Footer';
import { updateGithubUrl, updateLinkedinUrl, updateProfessionalRole } from '../../reducers/professionalRole';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfessionalRole = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [LinkedFocused, SetLinkedInFocused] = useState(false);
  const [LinkedInLinkLocal, setLinkedinLink] = useState('');
  const [GithubLinkLocal, setGithubLink] = useState('');
  const [loading, setLoading] = useState(false);
  const { professionalRole, LinkedInLink, GithubLink } = useSelector((state) => state.professionalRole);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../assets/Fonts/pe0pMI6IL4dPoFl9LGEmY6WaA_Rue1UwVg.ttf'),
  });

  useEffect(() => {
    if (value === '') {
      setValue(professionalRole);
      setLinkedinLink(LinkedInLink);
      setGithubLink(GithubLink);
    }
  }, [value]);

  async function handlePress() {
    console.log("firsttttttt")
    if (!value || !LinkedInLinkLocal || !GithubLinkLocal) {
      return;
    }
    setLoading(true);
    dispatch(updateProfessionalRole(value));
    dispatch(updateLinkedinUrl(LinkedInLinkLocal));
    dispatch(updateGithubUrl(GithubLinkLocal));
    setLoading(false);
    navigate?.navigate("Skill");
  }

  return (
    <View style={tw`h-full w-full bg-white `}>
      <Navbar />
      <Text style={[tw``, { marginTop: 10, fontFamily: 'MadimiOne', fontSize: 28, marginLeft: 15, marginTop: 20 }]}>
        Craft your professional identity with precision and flair.
      </Text>
      <Text style={{ fontFamily: 'TwinkleStar', fontSize: 18, marginTop: 10, marginLeft: 15 }}>
        Make a striking first impression. Let your profile radiate expertise, passion, and uniqueness.
      </Text>
      <View>
        <Text style={tw` mt-7 ml-8 font-semibold text-[15px]`}>Your Professional Role</Text>
        {/* Input */}
        <TextInput
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          placeholder='Software Engineer | Full Stack Developer'
          style={tw`w-10/12 mt-3  mx-auto border border-b-1 rounded-xl p-2 border-gray-200`}
        />
      </View>

      {/* Spinner */}
      <Spinner visible={loading} />

      <View style={tw`mt-10 w-11/12 mx-auto border border-gray-300 rounded-xl p-4 `}>
        <Text style={[tw`text-2xl`, { fontFamily: 'MadimiOne' }]}>Linked accounts</Text>
        <View style={tw`w-full border rounded-2xl border-gray-300 mt-7 flex flex-row items-center `}>
          <TextInput
            style={[styles.input, isFocused && styles.inputGithubFocused]}
            value={GithubLinkLocal}
            placeholder="Your Github Username"
            onChangeText={(text) => {
              setGithubLink(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        {/* LinkedIn section */}
        <View style={tw`w-full border border-gray-300 mt-7 rounded-2xl flex flex-row items-center `}>
          <TextInput
            style={[styles.input]}
            placeholder="Your LinkedIn Username"
            onChangeText={(text) => {
              setLinkedinLink(text);
            }}
            onFocus={() => SetLinkedInFocused(true)}
            onBlur={() => SetLinkedInFocused(false)}
          />
        </View>
      </View>
      <View style={tw` flex-1 justify-end `}>
        <View style={{ borderTopWidth: 5, borderTopColor: '#E5E7EB', padding: 17, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            navigate?.navigate("Signup");
          }}>
            <Text style={tw` border border-gray-300 p-2 rounded-full px-5`}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}>
            
            <Text style={tw` bg-green-600 p-3 px-6 rounded-full text-white font-bold`}>Skills</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'inherit',
    color: '#99A3BA',
    borderRadius: 40,
  },
  inputGithubFocused: {
    borderColor: '#99A3BA',
  },
});

export default ProfessionalRole;
