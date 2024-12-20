import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { hp, wp } from '../constants/common'
import { theme } from '../constants/theme'
import { useAuth } from '../context/authContext'
import { useNavigation } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from '../assets/icons'



const HomeScreen = () => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const inputRef = useRef('')

  
  
  return (
    <ScreenWrapper bg="white">
    <View style={styles.container}>
       <Text style={styles.title}>LinkUp!</Text> 
        <Pressable onPress={()=>navigation.navigate('Profile')} style={styles.imageWrapper}>
            {
              user && user?.profileUrl && (
                <Image
              source={{uri:user?.profileUrl}}
              style={styles.profileImage}
            />
              )
            }
        </Pressable>
    </View>

    <View style={{position:"absolute", bottom:wp(10), left:wp(80)}}>
    <Pressable onPress={()=>navigation.navigate('addPost')} style={styles.addIcon}>
            <Icon name="plus" color={'white'} size={26} strokeWidth={1.6}/>
        </Pressable>
    </View>
      




    


 

   
    </ScreenWrapper>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:wp(4)
  },
  title:{
    fontSize:hp(3),
    fontWeight:"bold",
    color:theme.colors.primary
  },
  imageWrapper:{
    backgroundColor:theme.colors.gray,
    borderRadius:100,
    padding:5
  },
   addIcon:{
    backgroundColor:theme.colors.primary,
    borderRadius:15,
    padding:wp(3)
  },
  profileImage:{
    height:hp(6.5),
    width:hp(6.5),
    borderRadius:100
  },
  postVideo:{
 height:hp(30),
 width:wp(80),
 alignSelf:"center"
  },
  searchBar:{
    paddingHorizontal:wp(4),
    // width:wp(90),
    // flexDirection:"row",
    // justifyContent:"space-between",
    // alignItems:"center",
    borderColor:theme.colors.gray,
    backgroundColor:theme.colors.white,
  },
  button:{
    backgroundColor:theme.colors.primary,
    height:hp(3),
    width:hp(3),
    padding:5,
    position:"absolute",
    top:0,
    bottom:0,

  }

})