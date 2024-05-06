import React, {useState } from 'react';
import { View, Text, StyleSheet, TextInput, Linking,Button } from 'react-native';
import tw from 'twrnc';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {UpdateProfile} from "../../../services/operations/ProfileHandler"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DecodedTokenHandler} from '../../../services/operations/generate&verifyOTP'
import { FindByEmail } from "../../../services/operations/ProfileHandler"
import { Feather } from '@expo/vector-icons';

 const ProfessionalRole = () => {
  const [value, setValue] = useState('')
  const[loading,setLoading]=useState(false);
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../../assets/Fonts/pe0pMI6IL4dPoFl9LGEmY6WaA_Rue1UwVg.ttf'),
  });
  

  async function updatetitle() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const decodedEmail = await DecodedTokenHandler(token);
      const Email = decodedEmail.data.Email
      const User_Profile = await FindByEmail(Email);
      
      User_Profile.data.response.Professional_Role = value;
      
      await UpdateProfile({ data: User_Profile.data.response });
      setLoading(false);
      navigation.navigate('Profile')
    } catch (error) {
      setLoading(false);
      console.error('Error updating professional role:', error);
    }
  }

  
  return (
    <View style={tw`h-full m-3 mt-12`}>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
      <Text style={[tw``, { marginTop: 10, fontFamily: 'MadimiOne', fontSize: 28, marginLeft: 15, marginTop: 20 }]}>
        Craft your professional identity with precision and flair.
      </Text>
      <Text style={{ fontFamily: 'TwinkleStar', fontSize: 18, marginTop: 10, marginLeft: 15 }}>
        Make a striking first impression. Let your profile radiate expertise, passion, and uniqueness.
      </Text>
      <View>
        <Text style={tw` mt-7 ml-8 font-semibold text-[15px]`}>Your Professional Role</Text>
        <TextInput
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          placeholder='Software Engineer | Full Stack Developer'
          style={tw`w-10/12 mt-3  mx-auto border border-b-1 rounded-xl p-2 border-gray-200`}
        />
      </View>
      <Spinner visible={loading}/>
      <View style={tw`mt-4 mx-auto mb-8 border-t border-gray-300 w-full`}>
        <TouchableOpacity onPress={updatetitle}>
          <Text style={tw`bg-green-600 p-3 px-6 rounded-full text-white font-bold text-center`}>Save</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 8,
    zIndex: 0,
    maxWidth: 300,
    marginHorizontal: 1,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#CDD9ED',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  searchContainerFocused: {
    borderColor: '#15803d', 
  },
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
  inputLinkedInFocused: {
    borderColor: '#15803d', 
  },
  emailSuffix: {
    height: "100%",
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius:10,
    borderRightWidth: 1,
    borderRightColor:"#d1d5db",
    color: '#99A3BA',
  },
  emailSuffixFocused: {
    backgroundColor: '#16a34a',
    color: '#fff',
  },
});
export default ProfessionalRole;