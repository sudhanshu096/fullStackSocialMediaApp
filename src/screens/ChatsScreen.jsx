import { View, Text, Button,ActivityIndicator, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { hp } from '../constants/common'
import { theme } from '../constants/theme'
import ChatList from '../components/ChatList'
import { useNavigation } from '@react-navigation/native'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '../firebaseConfig'


export default function Home() {
  const {user} = useAuth()

  const router = useNavigation();
  const[users, setUsers] = useState([])
  useEffect(()=>{
    if(user?.userId){
        getUsers()
    }

  },[])

  const getUsers = async() =>{
    //fetch Users
    const q = query(usersRef, where('userId','!=',user?.userId));
    const querySnapShot = await getDocs(q);

    let data =[];
    querySnapShot.forEach(doc=>{
      data.push({...doc.data()});
     
    })

   
       setUsers(data)
  }
  
  return (
    
    <View style={{flex:1, backgroundColor:"white"}}>
      <StatusBar style='light'/>
         <View style={styles.container}>
              <Text style={{ fontSize: hp(3), color:theme.colors.white, fontWeight:"bold" }}>
                Chats
              </Text>
            </View>

      {
        users.length>0?
          (
            <ChatList onrefresh={getUsers} currentUser={user} users={users}/>
          )
        :
        
        (
             <View style={{top:hp(30), display:"flex", alignItems:"center"}}>
              <ActivityIndicator color={theme.colors.primary} size="large"/>
              </View>

        )
      }
      
    </View>
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