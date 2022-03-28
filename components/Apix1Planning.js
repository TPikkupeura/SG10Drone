import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Apix1Planning({route, navigation}) {
  const { title } = route.params;
  return (
    <View>
      <Text>Appendix1</Text>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})