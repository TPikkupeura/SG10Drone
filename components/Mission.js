import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, {useState} from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Alert } from 'react-native-web';
//import {db, ROOT_REF} from './firebase/Config'; 
export default function Mission({navigation}) {

    const [title, onChangeTitle] = useState("");
    const [row, setRow] = useState([]);
    const arr = [...row];
    //const [newMission, setNewMission] = useState('');

    /* function addNewMission() {
      if(addNewMission.trim() !== "") {
        db.ref(ROOT_REF).push({
          done: false,
          missionItem: newMission
        })
        setNewMission('');
      }
    } */

    /* function removeMissions() {
      db.ref(ROOT_REF).remove();
    } */

    const createTwoButtonAlert = () => Alert.alert(
      "Missions", "Remove all missions?", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK", onPress: () => removeMissions()
      }],
      { cancelable: false}
    );

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
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.newItem}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Create Title"
        />
      <View style={styles.buttonStyle}>
        <Button
        title="Create Mission"
        onPress={()=> CreateMission()}
        />
        <View style={styles.missions}>{row}</View>
      </View>
      <View style={styles.buttonStyle}>
        <Button
        title="Remove all Missions"
        onPress={() => createTwoButtonAlert()}
        />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 30,
    height: '20%',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 30,
  },
  newItem: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#afafaf",
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 18
  }
})