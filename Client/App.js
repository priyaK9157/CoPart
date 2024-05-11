import React, { useState, useEffect } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native'; // Import CommonActions
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import professionalRole from './reducers/professionalRole';
import JobPage from './Component/Pages/JobPage';
import JobDesc from './Component/Pages/JobDesc';
import Signup from './Component/SignupComponent/Signup';
import GetStarted from './Component/GetStarted';
import ProfessionalRole from './Component/SignupComponent/ProfessionalRole';
import UserBio from './Component/SignupComponent/UserBio';
import Upload from './Component/SignupComponent/Upload';
import HomePage from './Component/Pages/HomePage';
import Verification from "./Component/SignupComponent/Verification";
import Skill from './Component/SignupComponent/Skill';
import { ToastContainer } from 'react-native-toast-message';
import Login from './Component/LoginComponent/Login';
import Index from "./Component/Pages/CreateProject/Index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateToken } from './reducers/signupReducer';
import AppLoading from 'expo-app-loading';
import { DecodedTokenHandler } from './services/operations/generate&verifyOTP';
import Toaster from './Component/Common/Toaster';
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from 'react-native-toast-message';
import Alert from './Component/Pages/Alert';
import Profile from './Component/Pages/ProfilePage/Profile';
import updatepasswordStep1 from "./Component/Pages/UpdatePassword/UpdatePaswordStep1"
import updatepasswordStep2 from "./Component/Pages/UpdatePassword/updatepasswordstep2"
import updatepasswordStep3 from "./Component/Pages/UpdatePassword/updatepasswordstep3.js"
import SearchPage from './Component/Pages/SearchPage.js';
import Loader from './Component/Pages/Loader.js';


export default function App() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState("Signup");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserAuth() {
      try {
        const token = await AsyncStorage.getItem('token');
        // const responseEmail = await DecodedTokenHandler(token);
        if (token) {
          setInitialRoute('HomePage');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error while checking user authentication:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkUserAuth();
  }, []);

  if (isLoading) {
    return <AppLoading/>
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Profile" component={Profile}/>
           <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Verification" component={Verification}/> 
          <Stack.Screen name="GetStarted" component={GetStarted}/>
          <Stack.Screen name="ProfessionalInfo" component={ProfessionalRole}/> 
          <Stack.Screen name="UserBio" component={UserBio}/>
          <Stack.Screen name="Skill" component={Skill}/>  
          <Stack.Screen name='HomePage' component={HomePage} options={{
            gestureEnabled: false,
            animationEnabled: false,
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            }),
          }}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="JobPage" component={JobPage}/>
          <Stack.Screen name="JobDesc" component={JobDesc}/>
          <Stack.Screen name='SearchPage' component={SearchPage}/>
          <Stack.Screen name='Index' component={Index}/>
          <Stack.Screen name='Alert' component={Alert}/>
          <Stack.Screen name='UpdatePasswordStep1' component={updatepasswordStep1}/>
          <Stack.Screen name='updatepasswordstep2' component={updatepasswordStep2}/>
          <Stack.Screen name='updatepasswordstep3' component={updatepasswordStep3}/>   
          <Stack.Screen name='Loader' component={Loader}/>      
          </Stack.Navigator> 
      </NavigationContainer>
      <Toast/>
     </Provider>
  );
}