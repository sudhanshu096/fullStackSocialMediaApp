import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native'
import React, { useRef } from 'react'



import { useNavigation } from '@react-navigation/native';

import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../constants/common';
import Button from '../components/Button';
import Video, {VideoRef} from 'react-native-video';






const WelcomeScreen = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);


  
  return (
    <View style={{flex:1}}>
    
      <StatusBar style='light'/>
    <Image
     //source={{uri:'https://storage.pics-x.com/gallery-images/125485/0043.jpg'}}

     source={require('../assets/images/welcome.jpg')}
     style={{height:"100%", width:"100%", position:"absolute"}}
     resizeMode='cover'
    />
    
    {/* <Video
      //source={{ uri: "https://s3-eu-west-1.amazonaws.com/video.gallereplay.com/artistarea/Lighthouse%20stands%20in%20Istanbul%E2%80%99s%20harbour_0554659b-5dc1-43d6-8a93-b31ec6b67f63/Cinemagraph_plain/1920x1080/cinemagraph.mp4"}}
     ref={videoRef}
      source={require('../assets/images/welcome.mp4')}
      style={{
        position:"absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      rate={1}
      shouldPlay={true}
      isLooping={true}
      volume={1}
      muted={true}
     
      resizeMode="cover"
      /> */}

    {/* linear gradient */}
    <Animated.View 
     entering={FadeInDown.duration(600)}
   style={{flex:1}}
    >
          <LinearGradient
           colors={['rgba(255,255,255,0)','rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)', 'black']}
           style={{height:hp(75), width:wp(100),position:"absolute", bottom:0}}
           start={{x:0.5, y:0}}
           end={{x:0.5, y:0.8}}
          />

          {/* content */}
          <View style={{flex:1, justifyContent:"flex-end", alignItems:"center", gap:5}}>
            <Animated.Text entering={FadeInDown.delay(400).springify()} style={{fontSize:hp(5.5), color:theme.colors.primaryDark, fontWeight:"bold"}}>LinkUp!</Animated.Text>
            <Animated.Text entering={FadeInDown.delay(500).springify()} style={{fontSize:hp(2.5), fontWeight:"500", color:theme.colors.white, letterSpacing:1}}>Chat with people around you.</Animated.Text>

            <Animated.View style={{width:"100%",marginBottom:wp(5), paddingHorizontal:wp(5)}} entering={FadeInDown.delay(600).springify()}>
               <Button
                title='Get Started'
                onPress={()=>navigation.replace('login')}
               />
            </Animated.View>

          </View>
    </Animated.View>
    </View>
  )
}

export default WelcomeScreen

