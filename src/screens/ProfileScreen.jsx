import { Alert, FlatList, Pressable, StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


import ScreenWrapper from '../components/screenWrapper';
import Header from '../components/Header';


import Icon from '../assets/icons';


import Avatar from '../components/Avatar';
import PostCard from '../components/postCard';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../constants/common';
import { theme } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

var limit =0;

const Profile = () => {
  const {user, logout} = useAuth();
     const {top} = useSafeAreaInsets();

  const router = useNavigation();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const onLogout = async() =>{
    await logout()
 }
//  useEffect(()=>{
//   getPosts()
//  },[])

//  const getPosts = async () => {
//   if(!hasMore) return null;
//   limit = limit +10;
//   let res = await fetchPosts(limit, user?.id);
//   console.log('user:',res)
 
//   if (res.success){
//     if(posts.length === res.data.length) setHasMore(false)
//     setPosts(res.data);
//   } 
 
// };



  const handleLogout = async() =>{
    Alert.alert('Confirm',"Are you sure, you want to logout?",[
      {
        text:'Cancel',
        onPress:()=>{console.log('modal cancelled')},
        style:'cancel'
      },
      {
        text:"Logout",
        onPress:()=>onLogout(),
        style:'destructive'
      }
    ])
  }
  return (
   <View style={{flex:1, backgroundColor:"white", paddingTop:top>0?top+5:10}}>

<FlatList
          data={posts}
          ListHeaderComponent={ <UserHeader user={user} router={router} handleLogout={handleLogout}/>}
          ListHeaderComponentStyle={{marginBottom:30}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard item={item} currentUser={user} router={router} />
          )}
          onEndReached={()=>{
             //getPosts();
           
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={hasMore?(
<View style={{ marginVertical: posts.length == 0 ? 100 : 30 }}>
              <Loading />
            </View>
          ):(
            <View style={{marginVertical:30}}>
                   <Text style={styles.noPosts}>
                    No more posts.
                   </Text>
          </View>
          )
            
          }
          
        />
    
    
    </View>
  )
}

const UserHeader = ({user, router, handleLogout})=>{

  return(
    <View style={{flex:1, backgroundColor:"white", paddingHorizontal:wp(2)}}>
     <Header title="Profile" mb={30}/>
     <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" color={theme.colors.rose}/>
     </TouchableOpacity>

     <View style={styles.container}>
       <View style={{gap:15}}>
          <View style={styles.avatarContainer}>
          <Avatar
           uri={user?.profileUrl}
           size={hp(12)}
           rounded={theme.radius.xxl*1.4}

          />
          <Pressable style={styles.editIcon} onPress={()=>router.navigate('editProfile',{})}>
             <Icon name="edit" strokeWidth={2.5} size={20}/>
          </Pressable>
          </View>
           {/* user name and adress */}
          <View style={{alignItems:"center", gap:4}}>
             <Text style={styles.userName}>{user && user.username}</Text>
             <Text style={styles.infoText}>{user && user.address}</Text>
          </View>

            {/* user email, phone, bio */}
            <View style={{gap:10}}>
               <View style={styles.info}>
                  <Icon name="mail" size={20} color={theme.colors.textLight}/>
                  <Text style={styles.infoText}>
                    {user && user?.email}
                  </Text>
               </View>
               {/* {
                user && user.phoneNumber && (
                 <View style={styles.info}>
                  <Icon name="call" size={20} color={theme.colors.textLight}/>
                  <Text style={styles.infoText}>
                    {user && user.phoneNumber}
                  </Text>
               </View>
                )
               } */}
               {
                user && user.bio &&(
                  <Text style={styles.infoText}>
                  {user.bio} 
                </Text>
                )
               }
            </View>
       </View>
     </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  logoutButton:{
    position:"absolute",
    right:10,
    padding:5,
    borderRadius:theme.radius.sm,
    backgroundColor:'#fee2e2'
  },
  avatarContainer:{
    height:hp(12),
    width:hp(12),
    alignSelf:"center"
  },
  editIcon:{
    position:"absolute",
    bottom:0,
    right:-12,
    padding:7,
    borderRadius:50,
    backgroundColor:"white",
    shadowColor:theme.colors.textLight,
    shadowOffset:{ width:0, height:4},
    shadowOpacity:0.4,
    shadowRadius:5,
    elevation:7

  },
  userName:{
    fontSize:hp(3),
    fontWeight:"500",
    color:theme.colors.textDark
  },
  info:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  infoText:{
    fontSize:hp(1.6),
    fontWeight:'500',
    color:theme.colors.textLight
  },
   listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts:{
    fontSize:hp(2),
    textAlign:"center",
    color:theme.colors.text,
  }
})