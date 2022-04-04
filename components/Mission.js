import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'

export default function Mission({navigation}) {

    const [row, setRow] = useState([]);
    const arr = [...row];

    function CreateMission() {
            arr.push(
                <Button 
                title="Mission"
                onPress={()=> navigation.navigate('FrontPage')}>
                </Button>
            );
            setRow(arr);
            console.log(row);
    }
  
  return (
    <View>
      <Button
      title='Create Mission'
      onPress={()=> CreateMission()}></Button>
        <View>{row}</View>
    </View>
  )
}

const styles = StyleSheet.create({})