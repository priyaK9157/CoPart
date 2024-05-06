import React, { useState } from 'react';
import { Text, View, TextInput,TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { UpdateProfile } from '../../../services/operations/ProfileHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedTokenHandler } from '../../../services/operations/generate&verifyOTP';
import { FindByEmail } from '../../../services/operations/ProfileHandler';
import { Feather } from '@expo/vector-icons';

const UserBio = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    MadimiOne: require('../../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf'),
    TwinkleStar: require('../../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf'),
  });

  async function handlePress() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const decodedEmail = await DecodedTokenHandler(token);
      const Email = decodedEmail.data.Email;
      const User_Profile = await FindByEmail(Email);

      User_Profile.data.response.User_Bio = value; 

      await UpdateProfile({ data: User_Profile.data.response });
      setLoading(false);
      navigation.navigate('Profile'); 
    } catch (error) {
      setLoading(false);
      console.error('Error updating user bio:', error);
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={tw`h-[95%] m-3 mt-12`}>
      
      <ScrollView>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Feather name="x" size={24} color="black" />
        </TouchableOpacity>

        <View>
          <Text style={[tw`font-MadimiOne text-2xl mx-4 mt-8`, { textAlign: 'justify' }]}>
            Craft a concise, engaging bio showcasing your professional journey succinctly.
          </Text>
          <Text style={[tw`font-TwinkleStar text-lg mx-4 mt-2`, { textAlign: 'justify' }]}>
            Compose a compelling professional biography, where your journey unfolds through eloquent prose. Infuse
            passion, expertise, and purpose into each word.
          </Text>
          <View style={tw`w-10/12 mt-6 mx-auto`}>
            <TextInput
              value={value}
              onChangeText={(text) => {
                setValue(text);
              }}
              multiline
              numberOfLines={8}
              placeholder="Please share your skills and experiences, highlighting key achievements and expertise relevant to your profession."
              style={tw`w-full border border-b-1 rounded-xl p-3 border-gray-200`}
              textAlignVertical="top"
            />
          </View>
        </View>
        <Spinner visible={loading} />
      </ScrollView>
      
      <View style={tw`mt-4 mx-auto mb-8 border-t border-gray-300 w-full`}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={tw`bg-green-600 p-3 px-6 rounded-full text-white font-bold text-center`}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserBio;
