import { Alert, Pressable, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';
import Input from '../components/Input';
import Icon from '../assets/icons';
import Button from '../components/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';



 

const LoginScreen = () => {
  const navigation = useNavigation();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false)

  const onSubmit = async() =>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Login', "Please fill all the fields");
      return;
    }
    let email = emailRef.current.trim();
    let password =passwordRef.current.trim();
    setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    setLoading(false)
    
  }
  return (
    <ScreenWrapper>
       <StatusBar style='dark'/>
        <View style={styles.container}>
           {/* <BackButton router={navigation}/> */}
               {/* Welcome Text */}
               <View>
                  <Text style={styles.welcomeText}>Hey,</Text>
                  <Text style={styles.welcomeText}>Welcome Back</Text>
               </View>
               {/* form */}
               <View style={styles.form}>
                 <Text style={{fontSize:hp(1.5), color:theme.colors.text}}>
                    Please login to continue
                 </Text>
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
                 <Text style={styles.forgotPassword}>
                    Forgot Password?
                 </Text>

                 {/* button */}

                   <Button
                    title='Login'
                    loading={loading}
                    onPress={onSubmit}
                   />
               </View>

               {/* footer */}
               <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account?</Text>
                 <Pressable onPress={()=>navigation.navigate('signup')}>
                 <Text  style={[styles.footerText, {color:theme.colors.primaryDark, fontWeight:theme.fonts.semibold}]}>SignUp</Text>
                 </Pressable>
               </View>
        </View>
    </ScreenWrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap:45,
    paddingHorizontal:wp(5),
    marginTop:hp(10)
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