import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react'

import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { firebase, auth, USERS } from "../firebase/Config.js"
import styles from '../style/Style.js'
import { setUser } from '../components/Functions'

/* 27.4.22 - Contains code provided from the teacher, unfortunately the screenshot ends at a crucial point on line 44.  */
function Login({navigation}) {

  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

 //const [user, setUser] = useState({});

  /*  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    }); */


 /* const login = async () => {
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
*/

const login = async () => {
  try {
    if (loginEmail.trim()!=='') {
      if (loginPassword.trim()!=='') {
        await firebase.auth().signInWithEmailAndPassword(loginEmail,loginPassword);
        const currentUser = firebase.auth().currentUser;
        firebase.firestore().collection(USERS).doc(currentUser.email).get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const nickname = documentSnapshot.data().nickname;
            const userJson = JSON.stringify({
              "email" : currentUser.email,
              "nickname" : nickname
            });
            setUser(userJson);
            console.log(userJson);
            navigation.navigate('Mission');
          }
        });
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }
};



   return (
     <View style={styles.container}>
       <StatusBar style="auto" />

       <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/dronepilot-939e2.appspot.com/o/logo.png?alt=media&token=6d8461ca-5cd3-4d78-b62a-086c9068b745'}}
   style = {{ width: 200, height: 200 }} />

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