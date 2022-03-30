import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import appendix2 from '../src/appendix2.json'

export default function Apix2Flight({navigation}) {
  const header = Object.keys(appendix2);
  
  return (
    <View>
      <Text>Appendix2</Text>
    </View>
  )
}

const styles = StyleSheet.create({})