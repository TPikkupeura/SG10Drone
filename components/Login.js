import { StyleSheet, Text, View, Pressable, Button} from 'react-native'
import React from 'react'

export default function Login({navigation}) {
  return (
    <View>
      <Text>Login</Text>
      <Pressable style={styles.buttonStyle}>
                <Button
                    title="Log in"
                    onPress={()=> navigation.navigate('Mission')}>   
                </Button>
            </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})