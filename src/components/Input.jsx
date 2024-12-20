import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../constants/common'


const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
     {
        props.icon && props.icon
     }
     <TextInput
      style={{flex:1, color:theme.colors.text}}
      placeholderTextColor={theme.colors.text}
      editable={props.edit &&props.edit}
      
      ref={props.inputRef && props.inputRef}
      {...props}
     />
     {
     props.addIcon && (
      <Pressable onPress={props.onPress}>
          {props.addIcon}
      </Pressable>
     )
     }
    
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        height:hp(7.2),
        alignItems:"center",
        justifyContent:"center",
        borderWidth:0.4,
        borderColor:theme.colors.text,
        borderRadius:theme.radius.lg,
        borderCurve:"continuous",
        paddingHorizontal:18,
        gap:12
    }
})