import { View, Text } from 'react-native'
import React from 'react'
import AppNavigation from './src/appNavigation'
import { AuthContextProvider } from './src/context/authContext'
import { MenuProvider } from 'react-native-popup-menu';


export default function App() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <AppNavigation />
      </AuthContextProvider>
    </MenuProvider>
  );
}