import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import * as appendix1 from "../src/appendix1.json"
import InputMethod from './InputMethod';
import uuid from 'react-native-uuid';

var title2 = 0; // original needs to be title

export default function Apix1Planning({route, navigation}) {
  const header = Object.keys(appendix1); //this will get all headers from json
  const { title } = route.params;
  //console.log(Object.keys(appendix1.InitPlanCheck));
  const getInputType = (jsonRow) =>{
    var inputType = Object.keys(jsonRow); //there gonna be just one atributte
    return inputType[0];                  //I hope so
  }


  // place where to show data and input
  function formData(datas) {
    const keys = Object.keys(datas); // Get all keys from dictionary
    var inputType;
    return keys.map((key) => {
      inputType = getInputType(datas[key])
      return (
        <View key = {uuid.v4()}>
        <Text>{key} : </Text>
        <InputMethod
          type={inputType}
          datas={datas}
          sentence={key}
          modify={modifyData}
          loadedValue = {datas[key][inputType]}
        />
        </View>
      )
    })
}

  const modifyData = (datas, sentence, value) =>{
    var inputType = getInputType(datas[sentence]);
    datas[sentence][inputType] = value;
    console.log(datas);
  }
  modifyData(appendix1.InitPlanCheck, "Mission purpose", "Getting NEAR");

  return (
    <View>
      <Text>MISSION PLANNING</Text>

      {/* <Text>{title}</Text> */}
      {/* title is header from navigation */}
      <Text>{header[title2]}</Text>
      {formData(appendix1[header[title2]])}
    </View>
  )
}

const styles = StyleSheet.create({})