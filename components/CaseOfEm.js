import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import uuid from 'react-native-uuid';

export default function CaseOfEm({route, navigation}) {
const {emObject} = route.params;



useEffect(()=>{
    navigation.setOptions({ title: emObject.sentence});
},[])

const rendEm = () => {
    let rendArr = [];
    for(let i = 0; i < emObject.predefined.length; i++){
        rendArr.push(<Text
                        key={uuid.v4()}
                        style={[styles.text,{backgroundColor: "lightblue"}]}
                        >
                    {emObject.predefined[i]}
                    </Text>);
    }
    return rendArr;
}

return (
    <View>
      {rendEm()}
    </View>
  )
}

const styles = StyleSheet.create({        
    text: {
        marginBottom: '5%',
        paddingTop: '2%',
        paddingBottom: '2%',
        justifyContent: 'center',
        borderColor: '#afafaf',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        minWidth: '60%',

},})