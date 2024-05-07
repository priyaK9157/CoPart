import React from 'react'
import { View } from 'react-native-animatable'
import { useSelector } from 'react-redux'
import TitlePage from './TitlePage';
import SkillsPage from './SkillsPage';
import ScopeView from './ScopeView';
import Conversation from './Conversation';

const Index = () => {
    const{step}=useSelector((state)=>state.createProject);
  return (
    <View>
         {
            step==1 && (
                <TitlePage/>
            ) 
         }
         {
            step==2 && (
               <SkillsPage/>
            )
         }
         {
            step==3 && (
               <ScopeView/>
            )
         }
         {
            step==5 && (
               <Conversation/>
            )
         }
    </View>
  )
}

export default Index