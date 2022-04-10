import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import caseOfEm from '../src/Caseofem.json'

export default function Appix3CaseOfEm({navigation}) {

  const Emergency = caseOfEm.CaseOfEm;
  const obj = JSON.parse(Emergency);
  console.log(obj.Instructions);

  return (
    <View>
      <Text>{obj}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})