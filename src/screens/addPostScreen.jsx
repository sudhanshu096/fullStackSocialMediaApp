import { Alert, Image, Pressable, ScrollView, StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';
import { useAuth } from '../context/authContext';
import ScreenWrapper from '../components/screenWrapper';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import RichTextEditor from '../components/RichTextEditor';
import Icon from '../assets/icons';
import Button from '../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';





const AddPost = () => {


  const {user} = useAuth();
  const bodyRef = useRef('');
  const editorRef = useRef(null);
  const router = useNavigation();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(file)

  // useEffect(()=>{
  //   if(post && post.id){
  //     bodyRef.current = post.body;
  //     setFile(post.file || null)
  //     setTimeout(() => {
  //       editorRef?.current?.setContentHTML(post.body)
  //     }, 300);
     

  //   }
  // },[])

  const onPick =async (isImage) =>{
    let mediaConfig={
      mediaType: 'photo',
       aspect: [4, 3],
      quality: 0.7,
    }
    if(!isImage){
      mediaConfig={
        mediaType: 'video',
        allowsEditing:true
      }
    }
    let result = await launchImageLibrary(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  }

  const isLocalFile = file =>{
    if(!file) return null;
    if(typeof file =='object') return true;
    return false;
  }
  const getFileType = file =>{
    if(!file) return null;
    if(isLocalFile(file)){
      return file.type;
    }

    if(file.includes('postImages')){
      return 'image';
    }
    return 'video'

  }

  const getFileUri =file =>{
    if(!file) return null;
    if(isLocalFile(file)){
      return file.uri;
    }
    return getSupabaseFileUrl(file)?.uri;
  }

  const onSubmit = async() =>{
   if(!bodyRef.current && !file){
    Alert.alert('Post','Please choose image or add post body!');
    return;
   }
   
   let data={
    file,
    body:bodyRef.current,
    userId:user?.id
   }
   if(post && post.id) data.id = post.id;

   //create or update post
   setLoading(true)
   let res = await createOrUpdatePost(data);
   setLoading(false)
   if(res.success){
    setFile(null);
    bodyRef.current ='';
    editorRef.current.setContentHTML('');
    router.back();
    
   }else{
    Alert.alert('Post',res.msg)
   }
  }
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
      <Header title="Create Post"/>
      <ScrollView contentContainerStyle={{gap:20}}>
         {/* avatar */}
         <View style={styles.header}>
            <Avatar
            uri={user.profileUrl}
            size={hp(6.5)}
            rounded={theme.radius.xl

            }
            />
            <View style={{gap:2}}>
                <Text style={styles.userName}>
                   {
                    user && user.username
                   }
                </Text>
                <Text style={styles.publicText}>
                   Public
                </Text>
            </View>
         </View>
         <View style={styles.textEditor}>
             <RichTextEditor editorRef={editorRef} onChange ={body=>bodyRef.current =body}/>
         </View>

         {
          file && (
            <View style={styles.file}>
               {
                getFileType(file) ==="video"?(
                  <Video
                   style={{flex:1}}
                   source={{uri:getFileUri(file)}}
                   useNativeControls
                   resizeMode='cover'
                   isLooping
                  />
                ):(
                  <Image
                  source={{uri:getFileUri(file)}}
                  resizeMode='cover'
                  style={{flex:1}}
                  />
                )
               }

               <Pressable style={styles.closeIcon} onPress={()=>setFile(null)}>
                  <Icon name="delete" size={20} color="white"/>
               </Pressable>
            </View>
          )
         }

         <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
               <TouchableOpacity onPress={()=>onPick(true)}>
                  <Icon name="image" size={30} color={theme.colors.dark}/>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>onPick(false)}>
                  <Icon name="video" size={33} color={theme.colors.dark}/>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView>
        <Button
         buttonStyle={{height:hp(6.2)}}
         title={'Post'}
         loading={loading}
         hasShadow={false}
         onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  )
}

export default AddPost

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:30,
    paddingHorizontal:wp(4),
    gap:15
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    gap:12
  },
  avatar:{
    width:hp(6.5),
    height:hp(6.5),
    borderRadius:theme.radius.xl,
    borderCurve:"continuous",
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  userName:{
    fontSize:hp(2.2),
    fontWeight:theme.fonts.semibold,
    color:theme.colors.text
  },
  publicText:{
    fontSize:hp(1.7),
    color:theme.colors.textLight,
    fontWeight:theme.fonts.medium
  },
  media:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:1.5,
    padding:12,
    paddingHorizontal:18,
    borderRadius:theme.radius.xl,
    borderCurve:"continuous",
    borderColor:theme.colors.gray
  },
  addImageText:{
    fontSize:hp(1.9),
    fontWeight:theme.fonts.semibold,
    color:theme.colors.text
  },
  mediaIcons:{
    flexDirection:"row",
    alignItems:"center",
    gap:15
  },
  file:{
    height:hp(30),
    width:"100%",
    borderRadius:theme.radius.xl,
    overflow:'hidden',
    borderCurve:"continuous"
  },
  closeIcon:{
    position:"absolute",
    top:5,
    right:10,
    backgroundColor:"rgba(255,0,0,0.6)",
    padding:7,
    borderRadius:50,
  }

})