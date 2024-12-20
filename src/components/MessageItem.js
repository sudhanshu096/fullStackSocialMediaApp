import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';


export default function MessageItem({message,currentUser}) {
  if(currentUser?.userId == message?.userId){
     //my message
     return (
       <View style={styles.myMessage}>
         <View style={{ width: wp(80) }}>
           <View style={styles.textContainer}>
             <Text style={{fontSize:hp(1.9),color:theme.colors.white}}>{message?.text}</Text>
           </View>
         </View>
       </View>
     );
  }
  else{
       return(
           <View style={{width:wp(80), marginLeft:3, marginBottom:3}} className="ml-3 mb-3">
              <View style={styles.otherMessage} >
                  <Text style={{fontSize:hp(1.9), color:theme.colors.white}}>
                      {message?.text}
                  </Text>
              </View>
           </View>
       )
  }
}
const styles = StyleSheet.create({
  myMessage:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginBottom:hp(1.2),
    marginRight:2
  },
  otherMessage:{
  display:"flex",
  alignSelf:'flex-start',
  padding:8,
  paddingHorizontal:wp(4),
  borderRadius:theme.radius.xl,
  backgroundColor:theme.colors.primary,
  borderWidth:1,
  borderColor:theme.colors.primary


  },
  textContainer:{
    display:"flex",
    alignSelf:"flex-end",
    padding:8,
    backgroundColor:theme.colors.primaryDark,
    borderColor:theme.colors.primary,
    borderWidth:0.7,
    borderRadius:theme.radius.xl,
    paddingHorizontal:wp(4)

  },

})