import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Modal, Button, Alert } from 'react-native'; // Import Alert from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateSignupData } from '../../reducers/signupReducer';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
import logo from '../../assets/logo.jpg'
import { generateOTP } from '../../services/operations/generate&verifyOTP';
import { useNavigation } from '@react-navigation/native'
import CheckBox from 'expo-checkbox';
import Spinner from 'react-native-loading-spinner-overlay';
import googleImage from "../../assets/google.png"
import { useToast } from "react-native-toast-notifications";
import Toast from 'react-native-toast-message';





const Signup = () => {

  const { data } = useSelector((state) => state.signup);
  const [firstName, setFirstName] = useState( data.Full_Name?.split('  ')[0]);
  const [lastName, setLastName] = useState( data.Full_Name?.split('  ')[1]);
  const [email, setEmail] = useState(data.Email);
  const [password, setPassword] = useState(data.password);
  const [country, setCountry] = useState("India");
  const [agreeTerms, setAgreeTerms] = useState(data.agreeTerms);
  const [isSelected, setSelection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const[userInfo,setUserInfo]=useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const toast=useToast();
  const [fontsLoaded] = useFonts({
    MadimiOne: require("../../assets/Fonts/2V0YKIEADpA8U6RygDnZZFQoBoHMd2U.ttf"),
    TwinkleStar: require("../../assets/Fonts/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OryLMFuOLlNldbw.ttf")
  });

  

  if (!fontsLoaded) {
    return null;
  }

  async function handleLoginNavigate() {
    navigate?.navigate("Login")
  }
  

  


  const handleSignup = async (e) => {
    e.preventDefault()
          if (!firstName || !lastName || !email || !password || !country || !agreeTerms) {
              Toast.show({
                type: 'error',
                text1: 'Please Fill All The Details To Proceed',
                position: 'bottom',
              });
                return;
          }
      
          // Email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if ((!emailRegex.test(email)) && (!data)) {
            Toast.show({
              type: 'error',
              text1: 'Please Gave a Vaild Email Address ',
              position: 'bottom',
            });
              return;
          }
      
          const Full_Name = firstName + ' ' + lastName
          const formData = {
            Full_Name,
            Email: email,
            password,
            country,
            agreeTerms,
          };

          
          
     
      setLoading(true)
      const OtpGenrateResponse=await generateOTP(email ? email : data.Email)
      setLoading(false)
      if(OtpGenrateResponse.data.message==="Profile found"){
        Toast.show({
          type: 'error',
          text1: 'User Already Registered',
          text2:"Please Use a Different Mail Id",
          position: 'bottom',
        });
          return;
      }
     
      if((Object.keys(data).length === 0)===true){
          dispatch(updateSignupData(formData));
      }

    navigate.navigate?.('Verification')

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setCountry('India');
    setAgreeTerms(false);

    setShowModal(false);
  }
    

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 }}>

        <Image source={logo} style={[{ width: 150, height: 100, alignSelf: 'center', marginTop: 20 }]} />
        <Text style={{ fontSize: 40, fontWeight: 'semibold', marginBottom: 10, fontFamily: 'MadimiOne' }}>Sign up to find</Text>
        <Text style={{ fontSize: 40, fontWeight: 'semibold', marginBottom: 10, fontFamily: 'MadimiOne' }}>your love</Text>

        {/*signup with google*/}
        <View>
               <TouchableOpacity style={tw`mt-4 rounded-full bg-[#38bdf8] p-2 w-[19rem]   flex flex-row  gap-3 items-center `} onPress={()=>{
                   promptAsync();
               }}>
                          <Image source={googleImage} height={12} width={12} style={tw`-ml-1 h-[38px] w-[38px] rounded-full`}/>
                          <Text style={tw` text-white p-1`}>Signup With Google</Text>
               </TouchableOpacity>
               <View style={tw` flex flex-row mt-3 items-center gap-2 mx-auto`}>
                      <Text style={[tw` w-[8rem] h-[1px]`,{borderWidth: 1, borderColor: '#d4cdcd'}]}></Text>
                      <Text style={tw` font-bold`}>Or</Text>
                      <Text  style={[tw` w-[8rem] h-[1px]`,{borderWidth: 1, borderColor: '#d4cdcd'}]}></Text>
               </View>
        </View>
        <View style={{ width: '100%', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>

            <View style={{ flexDirection: 'column', marginRight: 30 }}>
              <Text style={[tw`font-bold p-2 text-black`, { fontFamily: '', fontSize: 15 }]}>First Name</Text>
              <TextInput
                style={[tw` p-2 rounded-xl   w-[9rem]`,{ borderWidth: 2, borderColor: '#d4cdcd'}]}
                placeholder=""
                placeholderTextColor="gray"
                value={firstName ? firstName :  data.Full_Name?.split('  ')[0]}
                onChangeText={setFirstName}
              />
            </View>

            <Spinner
              visible={loading}
              textStyle={styles.spinnerText}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={[tw`font-bold p-2 text-black`, { fontFamily: '', fontSize: 15, }]}>Last Name</Text>
              <TextInput
                style={[tw` p-2 rounded-xl  w-[9rem]`,{ borderWidth: 2, borderColor: '#d4cdcd'}]}
                placeholder=""
                placeholderTextColor="gray"
                value={lastName ? lastName : data.Full_Name?.split('  ')[1]}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <Text style={[tw`font-bold p-2 text-black`, { fontFamily: '', fontSize: 15, }]}>Email</Text>
          <TextInput
            style={{ borderWidth: 2, borderColor: '#d4cdcd', paddingHorizontal: 8, marginBottom: 10, borderRadius: 8, height: 45, borderColor: '#d4cdcd' }}
            placeholder=""
            placeholderTextColor="gray"
            value={email? email :data.Email}
            onChangeText={setEmail}
          />
          <Text style={[tw`font-bold p-2 text-black`, { fontFamily: '', fontSize: 15, }]}>Password</Text>
          <TextInput
            style={[tw` p-4 rounded-xl py-2`,{ borderWidth: 2, borderColor: '#d4cdcd'}]}
            placeholder="Password (8 or more characters)"
            placeholderTextColor="gray"
            value={password ? password : data.password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={[tw`font-bold p-2 text-black`, { fontFamily: '', fontSize: 15, }]}>Country</Text>
          <View style={[tw` rounded-xl`,{ borderWidth: 2, borderColor: '#d4cdcd'}]}>
            <Picker
              selectedValue={country ? country : data.country}
              style={[tw``,{ height: 40, width: '100%', }]}
              onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
              <Picker.Item label="India" value="India" style={[tw` `,{ textAlign: 'center', textAlignVertical: 'center' }]} />
            </Picker>
          </View>
        </View>
        <View style={tw`flex flex-row mt-2 w-[94%] mx-auto `}>
          <CheckBox
            value={isSelected}
            onValueChange={(newValue) => {
              setSelection(newValue);
              setAgreeTerms(newValue);
            }}
            style={tw`mt-[2px]`}
          />
          <View style={{ flexDirection: 'row', alignItems: '', marginBottom: 5 }}>
            <Text style={{ marginLeft: 8, fontSize: 15, fontFamily: 'TwinkleStar' }}>Yes, I understand and agree to the<Text style={tw` font-bold text-green-700 underline`}> CoPartner terms of Service</Text>, including the<Text style={tw` font-bold text-green-700 underline`}> User Agreement</Text> and <Text  style={tw` font-bold text-green-700 underline`}>Privacy Policy.</Text></Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={[tw`bg-green-700 py-4 px-25 text-lg rounded-full mt-8`,]} onPress={handleSignup}>
            <Text style={[tw`text-white mx-auto font-semibold`, { fontSize: 14, fontFamily: 'MadimiOne' }]}>Create my account</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ marginBottom: 10 }}>All fields are required</Text>
              <Button title="OK" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
        <View style={tw` flex flex-row items-center justify-center mt-3`}>
          <View>
            <Text style={{ fontFamily: 'TwinkleStar' }}>Already have an account? </Text>
          </View>
          <TouchableOpacity onPress={handleLoginNavigate}>
            <Text style={{ color: 'green', textDecorationLine: 'underline', padding: 5 }}> Log In</Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    // alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default Signup;
