import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import * as appendix1 from "../src/appendix1.json"

var title2 = 4; // original needs to be title

export default function Apix1Planning({route, navigation}) {
  const header = Object.keys(appendix1); //this will get all headers from json
  const { title } = route.params;
  //console.log(Object.keys(appendix1.InitPlanCheck));
  const getInputType = (jsonRow) =>{
    var inputType = Object.keys(jsonRow);
    return inputType[0];
  }

  function getData(datas) {
    const keys = Object.keys(datas); // Get all keys from dictionary
    var inputType;
    return keys.map((key) => {
      inputType = getInputType(datas[key])
      return (
        <Text key={key}>{key} : {datas[key][inputType]}</Text>
      )
    })
}

  function modifyData(datas, atribute){
    var inputType = getInputType(datas[atribute]);
    datas[atribute][inputType] = "Travel to moon twice";
  }
  modifyData(appendix1.InitPlanCheck, "Mission purpose");

  return (
    <View>
      <Text>MISSION PLANNING</Text>

      {/* <Text>{title}</Text> */}
      {/* title is header from navigation */}
      <Text>{header[title2]}</Text>
      {getData(appendix1[header[title2]])}
    </View>
  )
}

const styles = StyleSheet.create({})