import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'



import { collection, doc, onSnapshot, orderBy, query, } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getRoomId, formatDate, hp, wp } from '../constants/common';
import { theme } from '../constants/theme';



export default function ChatItem({noBorder, item, router, currentUser}) {
    const[lastMessage, setLastMessage] = useState(undefined)

    useEffect(()=>{
        let roomId = getRoomId(currentUser?.userId, item?.userId);
         const docRef = doc(db,'rooms', roomId);
         const messageRef = collection(docRef,'messages');
         let q  = query(messageRef, orderBy('createdAt','desc'))

         let unsub = onSnapshot(q,(snapShot)=>{
           let allMessages = snapShot.docs.map(doc=>{
              return doc.data()
           });
             setLastMessage(allMessages[0]? allMessages[0]:null)
         })

         return unsub;


    },[])

    const openChatRoom = async() =>{
        router.navigate('chatRoom',{params:item});
    }

    const renderTime =() =>{

        if(lastMessage){
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds *1000))
        }
    
    }
    const renderLastMessage =() =>{
        if(typeof lastMessage =="undefined") return 'Loading.....';
        if(lastMessage){
           if(currentUser?.userId == lastMessage?.userId) return "You: "+lastMessage.text;
           return lastMessage.text;
        }else{
            return  'Say Hi..👋'
        }
    }
  return (
    <Pressable onPress={openChatRoom} style={[styles.chatItem,{
        borderBottomColor:noBorder?"":theme.colors.gray,
        borderBottomWidth:noBorder?0:1
    }]}>


        <Image
         style={{height:hp(6), width:hp(6), borderRadius:100}}
         source={{uri:item?.profileUrl}}
         
        />
        <View style={{flex:1, gap:5}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{fontSize:hp(1.8), fontWeight:"600", color:theme.colors.text}}>{item?.username}</Text>
                <Text style={{fontSize:hp(1.6), fontWeight:"500", color:theme.colors.text}}>
                    {renderTime()}
                </Text>
            </View>

            <Text style={{fontSize:hp(1.6), fontWeight:"500", color:theme.colors.text}}>
                {renderLastMessage()}
            </Text>

        </View>
       

    </Pressable>
  )
}

const styles = StyleSheet.create({
    chatItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:wp(4),
        gap:5,
        padding:7,    

    }
})