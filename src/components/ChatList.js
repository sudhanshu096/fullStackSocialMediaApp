import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useNavigation } from '@react-navigation/native'

export default function ChatList({users, currentUser,onrefresh}) {
  const router = useNavigation()
  return (
    <View style={{flex:1}}>
       <FlatList
        data={users}
        contentContainerStyle={{flex:1, paddingVertical:25}}
        keyExtractor={(item)=>Math.random()} 
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=><ChatItem
         noBorder={index+1 ==users.length}
          router={router}
           item={item}
           index={index}
           currentUser={currentUser}
           />}
       />
      
    </View>
  )
}