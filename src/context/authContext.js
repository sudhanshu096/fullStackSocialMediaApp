import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, usersRef } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const[user, setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
       
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid,user?.email)
            }else{
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
    },[])

    const updateUserData =async(userId, email) =>{
      const docRef = doc(db, 'users',userId)
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        let data = docSnap.data();
        setUser({...user, username:data.username, profileUrl:data.profileUrl, userId:data.userId, email:email, bio:data.bio})
      }
    }

    const setUserData =userData =>{
        setUser({...userData})
      }
      

     const updateUser = async (userId, data) =>{
        try {
            await updateDoc(doc(db, "users", userId), data);
            // setUser({...user, data})
            return {success:true}
            
        } catch (e) {
           return {success:false, msg:e.message}
        }
      }


 const login = async(email, password)=>{
   try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      return {success:true}
   } catch (e) {
    let msg = e.message;
    if(msg.includes('(auth/invalid-email)')) msg = 'Invalid Email'
    if(msg.includes('(auth/invalid-credential)')) msg = 'Wrong Credentials'
       return {success:false, msg:msg}
   }
}
 const logout = async()=>{
   try {
      await signOut(auth)
      return {success:true}
   } catch (e) {
    return {success:false, msg:e.message, error:e}
   }
}
 const register = async(email, password, username, profileUrl, bio)=>{
    
   try {
    const response = await createUserWithEmailAndPassword(auth,email, password);

    await setDoc(doc(db, "users", response?.user?.uid),{
        username,
        profileUrl,
        bio,
        userId:response?.user?.uid
    })

  
    return {success:true, data:response?.user}
   } catch (e) {
    console.log(e)
    let msg = e.message;
    if(msg.includes('(auth/invalid-email)')) msg = 'Invalid Email'
    if(msg.includes('(auth/email-already-in-use)')) msg = 'This email is already in use'
       return {success:false, msg:msg}
   }
}

return(
    <AuthContext.Provider value={{user, isAuthenticated, login, logout, register, updateUser, setUserData}}>
        {children}
    </AuthContext.Provider>
)

}

export const useAuth = () =>{
    const value = useContext(AuthContext)

    if(!value){
        throw new Error ('useAuth must be wrapped inside AuthContextProvider')
    }
    return value;
}