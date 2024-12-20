import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from './context/authContext';

import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';


import WelcomeScreen from './screens/WelcomeScreen';
import StartPageScreen from './screens/StartPageScreen';
import { TabNavigation } from './tabNavigation';
import EditProfile from './screens/EditProfileScreen';
import ChatRoom from './screens/ChatRoom';
import AddPostScreen from './screens/addPostScreen';




const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const {isAuthenticated} = useAuth();

    if(isAuthenticated ===undefined){
        return (
            <NavigationContainer>
               <Stack.Navigator screenOptions={{
                 headerShown:false
               }}>
                   <Stack.Screen name='StartPage' component={StartPageScreen}/>
                   
               </Stack.Navigator>
            </NavigationContainer>
           )
    }

   else  if(isAuthenticated){
        return (
            <NavigationContainer>
               <Stack.Navigator  screenOptions={{
                 headerShown:false
               }}>
                  
                   <Stack.Screen name='Tabs' component={TabNavigation}/>
                   <Stack.Screen name='Profile' component={ProfileScreen}/>
                   <Stack.Screen name='chatRoom' component={ChatRoom}/>
                   <Stack.Screen name='addPost' component={AddPostScreen}/>
             
                   <Stack.Screen name='editProfile' component={EditProfile}/>
               </Stack.Navigator>
            </NavigationContainer>
           )
    }
    else{
        return (
            <NavigationContainer>
               <Stack.Navigator screenOptions={{
                 headerShown:false
               }}>
                   <Stack.Screen name='Welcome' component={WelcomeScreen}/>
                   <Stack.Screen name='login' component={SignInScreen}/>
                   <Stack.Screen name='signup' component={SignupScreen}/>
               </Stack.Navigator>
            </NavigationContainer>
           )
    }
 
}