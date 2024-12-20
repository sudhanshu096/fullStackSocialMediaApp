import { View, Text, Pressable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { hp, wp } from '../constants/common'
import BackButton from './BackButton'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'



export default function ChatRoomHeader({router, user}) {
  return (
    <View style={styles.container}>
        <View style={styles.leftView}>
          <BackButton router={router}/>
          <View style={styles.leftcontent}>
                <Image
                 source={{uri:user?.profileUrl}}
                 style={{height:hp(4.5), aspectRatio:1,borderRadius:100}}
                />

                <Text style={{fontSize:hp(2.5), color:theme.colors.text, fontWeight:"500"}}>{user?.username}</Text>

            </View>
        </View>

        <View style={styles.rightView}>
                 <Icon name="call" size={26} strokeWidth={1.6}/>
                 <Icon name="video" size={26} strokeWidth={1.6}/>

                </View>



    </View>
  )
}    
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
         paddingHorizontal:wp(4),
         paddingTop:wp(5),
    },
    leftView:{
        flexDirection:"row",
        alignItems:"center",
        gap:5
    },
    leftcontent:{
        flexDirection:"row",
        alignItems:"center",
        gap:4
    },
    rightView:{
        flexDirection:"row",
        alignItems:"center",
        gap:8
    }
})