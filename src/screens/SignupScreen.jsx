import { Alert, Pressable, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/BackButton';
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import Input from '../components/Input';
import Button from '../components/Button';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';



 

const SignupScreen = () => {
  const navigation = useNavigation();
  const {register} = useAuth();
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const profileRef = useRef('');
  const bioRef = useRef('')
  const [loading, setLoading] = useState(false)

  

  const onSubmit = async() =>{
    if(!nameRef.current ||!emailRef.current || !passwordRef.current ){
      Alert.alert('Login', "Please fill all the fields");
      return;
    }
    //good to go

   

    setLoading(true)
  let response = await register(emailRef.current,passwordRef.current, nameRef.current, profileRef.current,bioRef.current )
    setLoading(false)

  }
  return (
    <ScreenWrapper bg='white'>
      <CustomKeyboardView>
       <StatusBar style='dark'/>
        <View style={styles.container}>
           <BackButton router={navigation}/>
               {/* Welcome Text */}
               <View>
                  <Text style={styles.welcomeText}>Let's,</Text>
                  <Text style={styles.welcomeText}>Get Started</Text>
               </View>
               {/* form */}
               <View style={styles.form}>
                 <Text style={{fontSize:hp(1.5), color:theme.colors.text}}>
                    Please fill details to create an account
                 </Text>

                 <Input
                  icon={<Icon name="user" size={26} strokeWidth={1.6}/>}
                  placeholder="Enter your username"
                  onChangeText={value=>{nameRef.current = value}}
                 />
                 <Input
                  icon={<Icon name="mail" size={26} strokeWidth={1.6}/>}
                  placeholder="Enter your email"
                  onChangeText={value=>{emailRef.current = value}}
                 />

                  <Input
                  icon={<Icon name="lock" size={26} strokeWidth={1.6}/>}
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={value=>{passwordRef.current = value}}
                 />

            
                 

                 {/* button */}

                   <Button
                    title='Signup'
                    loading={loading}
                    onPress={onSubmit}
                   />
               </View>

               {/* footer */}
               <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account!</Text>
                 <Pressable onPress={()=>navigation.navigate('login')}>
                 <Text  style={[styles.footerText, {color:theme.colors.primaryDark, fontWeight:theme.fonts.semibold}]}>Login</Text>
                 </Pressable>
               </View>
        </View>
        </CustomKeyboardView>
    </ScreenWrapper>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap:45,
    paddingHorizontal:wp(5)
  },
  welcomeText:{
    fontSize:hp(4),
    fontWeight:theme.fonts.bold,
    color:theme.colors.text,
  },
  form:{
    gap:25
  },
  forgotPassword:{
    textAlign:"right",
    color:theme.colors.text,
    fontWeight:theme.fonts.semibold
  },
  footer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:'center',
    gap:5
  },
  footerText:{
    textAlign:"center",
    color:theme.colors.text,
    fontSize:hp(1.6)
  }
})