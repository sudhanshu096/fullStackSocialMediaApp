import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { useAuth } from '../context/authContext'




const Avatar = ({
    uri,
    size=hp(4.5),
    rounded=theme.radius.md,
    style={}
}) => {


  return (
   <Image
   source={{uri:uri}}
   resizeMode='cover'
   style={[styles.avatar, {height:size, width:size, borderRadius:rounded}, style]}
   />
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar:{
    borderCurve:'continuous',
    borderColor:theme.colors.darkLight,
    borderWidth:1,
  }
})