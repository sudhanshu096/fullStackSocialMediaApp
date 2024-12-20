import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import ScreenWrapper from '../components/screenWrapper';
import Header from '../components/Header';
import Icon from '../assets/icons';
import Input from '../components/Input';
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';
import { useAuth } from '../context/authContext';
import Button from '../components/Button';

const EditProfile = () => {
    const {user:currentUser, setUserData, updateUser} = useAuth();
    const [loading, setLoading] = useState(false)
    const router = useNavigation();
    const [user, setUser] = useState({
        name:'',
        email:'',
        image:null,
        bio:'',
        address:""
    })
    useEffect(()=>{
       if(currentUser){
        setUser({
            name:currentUser.username ||'',
            email:currentUser.email ||'',
            image:currentUser.profileUrl || null,
            bio:currentUser.bio || ''
        })
       }
    },[currentUser])
    
    const onPickImage = async() =>{
        const mediaConfig ={
            mediaType: 'photo',
            aspect: [4, 3],
            quality: 0.7,
        }
        let result = await launchImageLibrary(mediaConfig);
        

          if (!result.didCancel) {
            setUser({...user, image:result.assets[0]});
          }
    }

    const onSubmit = async() =>{
        let userData ={...user};
        let {name, email, image, bio} = userData;
        if(!name || !email|| !bio){
            Alert.alert('Profile', "Please fill all the fields")
            return;
        }
        setLoading(true)

        if(typeof image == 'object'){
            //upload image
            let imageRes = await uploadFile('profiles',image.uri, true);
            if(imageRes.success) userData.image = imageRes.data;
            else userData.image = null;
        }
        const res = await updateUser(currentUser?.userId, userData)
        setLoading(false)
        console.log('update user result:', res)
        if(res.success){
              setUserData({...currentUser,...userData})
            router.goBack()
        }
    }

   

  return (
    <ScreenWrapper>
      <View style={styles.container}>
          <ScrollView style={{flex:1}}>
              <Header title="Edit Profile"/>
              {/* form */}

              <View style={styles.form}>
                 <View style={styles.avatarContainer}>
                    <Image
                     source={{uri:currentUser?.profileUrl}}
                     style={styles.avatar}
                    />
                    <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                        <Icon name="camera" size={20} strokeWidth={2.5}/>
                    </Pressable>
                 </View>

                 <Text style={{fontSize:hp(1.5), color:theme.colors.text}}>Please fill your profile details</Text>

                 <Input
                 icon={<Icon name="user" />}
                 placeholder="Enter your name"
                 value={user.name}
                 onChangeText={(value)=>{setUser({...user, name:value})}}
                 />

               <Input
                 icon={<Icon name="mail" />}
                 placeholder="Enter your Email"
                 value={user.email}
                 onChangeText={(value)=>{setUser({...user, email:value})}}
                 />

              
            

                <Input
                 placeholder="Enter your bio"
                 multiline={true}
                 containerStyle={styles.bio}
                 value={user.bio}
                 onChangeText={(value)=>{setUser({...user, bio:value})}}
                 />

                 <Button title='Update' loading={loading} onPress={onSubmit}/>
              </View>
          </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:wp(4),
    },
    avatarContainer:{
        height:hp(14),
        width:hp(14),
        alignSelf:"center"
    },
    avatar:{
        width:"100%",
        height:'100%',
        borderRadius:theme.radius.xxl*1.8,
        borderCurve:'continuous',
        borderWidth:1,
        borderColor:theme.colors.darkLight
    },
    form:{
        gap:18,
        marginTop:20
    },
    cameraIcon:{
        position:"absolute",
        bottom:0,
        right:-10,
        padding:8,
        borderRadius:50,
        backgroundColor:'white',
        shadowColor:theme.colors.textLight,
        shadowOffset:{width:0, height:4},
        shadowOpacity:0.4,
        shadowRadius:5,
        elevation:7
    },
    bio:{
        flexDirection:"row",
        height:hp(15),
        alignItems:"flex-start",
        paddingVertical:15
    }


})