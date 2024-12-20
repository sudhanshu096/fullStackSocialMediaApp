import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from 'react-native-vector-icons/Ionicons';


import { theme } from "./constants/theme";
import HomeScreen from "./screens/HomeScreen";
import AddPostScreen from "./screens/addPostScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ProfileScreen from "./screens/ProfileScreen";


//Screens import 



//Screens Name
const homeName = "Home";
const profileName = "profile";
const chatsName ="Chats"



const Tab = createBottomTabNavigator();

 export const TabNavigation = () =>{

    return(
        <Tab.Navigator initialRouteName={homeName}
         screenOptions={({route})=>({
            tabBarIcon: ({focused, color})=>{
                let iconName;
                let rn= route.name;

                if(rn ==homeName){
                    iconName = focused ?"home":"home-outline"
                    
                }
                else if(rn == chatsName){
                    iconName = focused ? "chatbubbles": "chatbubbles-outline"
                }
                

                else if(rn == profileName){
                    iconName = focused ? "person-circle": "person-circle-outline"
                }
                
            
               
                return <Icons name={iconName} size={30} color={color}/>

            },
            
            tabBarActiveTintColor: theme.colors.white,
            tabBarInactiveTintColor:theme.colors.gray,
            tabBarHideOnKeyboard:true,
            tabBarShowLabel:false,
            
            tabBarStyle:{
                height:45,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:theme.colors.primary
            }
              
         })}
         
         
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>     
            <Tab.Screen name="Chats" component={ChatsScreen} options={{headerShown:false}}/>
            {/* <Tab.Screen name="profile" component={ProfileScreen} options={{headerShown:false}}/> */}
        


        </Tab.Navigator>
    )
  
}