import { View, Text, Platform, StyleSheet,Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



import { useAuth } from '../context/authContext';


import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { theme } from '../constants/theme';
import { hp, wp } from '../constants/common';
import Icon from '../assets/icons';

const ios = Platform.OS =='ios'

export default function ChatsHeader() {
    const {user,logout} = useAuth()

    const {top} = useSafeAreaInsets()

    const handleProfile =()=>{
        
    }
    const handleLogout =async()=>{
       await logout() 
    }

  return (
    <View
      style={[{ paddingTop: ios ? top : top + 10 }, styles.container]}
    >
   

  
    </View>
  );
}


const Divider =() =>{
    return(
        <View className="p-[1px] w-full bg-neutral-200"/>
    )
}

const styles = StyleSheet.create({
container:{
    flexDirection:"row",
    padding:10,
    backgroundColor:theme.colors.primary,
    borderBottomLeftRadius:theme.radius.xl,
    borderBottomRightRadius:theme.radius.xl,
    

}
})