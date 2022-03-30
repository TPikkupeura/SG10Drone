import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'
import Dropdown from '../components/Apix2Dropdown'

export default function FrontPage({navigation}) {
  return (
    <View>
      <Text>FrontPage</Text>
      <Pressable style={styles.buttonStyle}>
        <Button
            title="Planning"
            onPress={()=> navigation.navigate('Apix1Planning',{title:0})}>   {/* title should be selected header from Planing default 0 */}
        </Button>
        <Dropdown/>
        <Button
            title="Case of Em"
            onPress={()=> navigation.navigate('Apix3CaseOfEm')}> 
        </Button>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})