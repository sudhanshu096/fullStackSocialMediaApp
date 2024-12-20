import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const StartPageScreen = () => {
  return (
  <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary}/>
  </View>
  )
}

export default StartPageScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})