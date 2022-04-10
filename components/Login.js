import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
//import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
//import { auth } from ""

//5.4.2021 - Created input boxes that update the variable when text is inserted, still WIP
//plenty of hours figuring out everything 
//took a really long time just to find out that its possible to use 'this.props.navigation.navigate('Mission')' 
//rather than go with a 'function balls({navigation})' with a button including 'navigation.navigate('FrontPage')'
//style also isnt permanent, just something for now before its seperate. 

class Login extends Component{
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }

/*
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    }
  }

  const logout = async () => {
    await signOut(auth);
  }
*/  



   render() {
    
    
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email..."
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password..."
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
              <TouchableOpacity 
               style = {styles.submitButton}
               onPress = {
                  () => this.props.navigation.navigate('Mission')
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

         </View>
      )
   }
}

export default Login 


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#000000',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})