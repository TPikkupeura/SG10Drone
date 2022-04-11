import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react'

import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase/Config.js"
import styles from '../style/Style.js'

/* 11.4.2021 - Spent too much time on this troubleshooting everything. Finally able to push!! Created a Style.js file and set up auth with firebase.. tested working with the dronepilot firebase projects sdk setup/config. 
This means i had to use the apikey config from the DronePilot firebase. Also added a skip login button, so that the project is functional offline too, for now. Also thought of and tried out the usage of a logo in the login. */ 

function Login({navigation}) {

   const [loginEmail, setEmail] = useState("");
   const [loginPassword, setPassword] = useState("");

  const [user, setUser] = useState({});

   onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

   
  const login = async () => {
   try {
     const user = await signInWithEmailAndPassword(
       auth,
       loginEmail,
       loginPassword
     );
     console.log(user);
     navigation.navigate('Mission')
   } catch (error) {
     console.log(error.message);
   }
 };



   return (
     <View style={styles.container}>
       <StatusBar style="auto" />
       <View style={styles.inputView}>
         <TextInput
           style={styles.TextInput}
           placeholder="Email..       "
           placeholderTextColor="black"
           onChangeText={(loginEmail) => setEmail(loginEmail)}
         />
       </View>
  
       <View style={styles.inputView}>
         <TextInput
           style={styles.TextInput}
           placeholder="Password..    "
           placeholderTextColor="black"
           secureTextEntry={true}
           onChangeText={(loginPassword) => setPassword(loginPassword)}
         />
       </View>
  
  
       <TouchableOpacity style={styles.loginBtn}
       onPress = {login}>
         <Text style={styles.loginText}>LOGIN</Text>
       </TouchableOpacity>
      
       <TouchableOpacity style={styles.loginBtn}
       onPress = {()=> navigation.navigate('Mission')}>
         <Text style={styles.loginText}>SKIPLOGIN</Text>
       </TouchableOpacity>
      
     </View>
   );
 }


 export default Login;