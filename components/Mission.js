import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, {useState} from 'react'

export default function Mission({navigation}) {

    const [title, onChangeTitle] = useState("");
    const [row, setRow] = useState([]);
    const arr = [...row];

    function CreateMission() {
            arr.push(
                <Button
                key={title}
                title={title}
                onPress={()=> navigation.navigate('FrontPage')}>
                </Button>
            );
            setRow(arr);
            //console.log(row);
    }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Create Title"
      />
      <Button
      title='Create Mission'
      onPress={()=> CreateMission()}
      />
      <View style={styles.missions}>{row}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    alignSelf: 'center'
  },
  missions: {
    marginTop: 10,
  }
})