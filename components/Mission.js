import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import {db, LOGS} from '../firebase/Config';
import Entypo from '@expo/vector-icons/Entypo'

export default function Mission({navigation}) {

    const [newMission, setNewMission] = useState('');
    const [missions, setMissions] = useState({});

    useEffect(() => {
      db.ref(LOGS).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let missionItems = {...data};
        setMissions(missionItems);
      });
    }, []);

    function addNewMission() {
      if(newMission.trim() !== "") {
        db.ref(LOGS).push({
          date: "",
          missionItem: newMission
        })
        setNewMission('');
      }
    }

    const MissionItem = ({missionItem: {missionItem: title}, id}) => {

      const onRemove = () => {
          db.ref(LOGS + [id]).remove();
      };
      
      return (
          <View style={styles.missionItem}>
              <Pressable onPress={() => navigation.navigate("FrontPage")}>
                  <Text
                      style={
                          [styles.missionText]
                      }>{title}
                  </Text>
              </Pressable>
              <Pressable>
                  <Entypo name={'trash'} size={32} onPress={onRemove}/>
              </Pressable>
          </View>
      );
  }
   /*  function removeMissions() {
      db.ref(ROOT_REF).remove();
    } */

    /* const createTwoButtonAlert = () => Alert.alert(
      "Missions", "Remove all missions?", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK", onPress: () => removeMissions()
      }],
      { cancelable: false}
    ); */

  let missionKeys = Object.keys(missions);

  return (
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.newItem}>
        <TextInput
          style={styles.input}
          onChangeText={setNewMission}
          value={newMission}
          placeholder="Create Title"
        />
      <View style={styles.buttonStyle}>
        <Button
        title="Create Mission"
        onPress={()=> addNewMission()}
        />
      </View>
      <ScrollView>
        {missionKeys.length > 0 ? (
          missionKeys.map(key => (
            <MissionItem
              key={key}
              id={key}
              missionItem={missions[key]}
            />
          ))
        ) : (
          <Text style={styles.infoText}>There are no missions</Text>
        )}
        {/* <View style={styles.buttonStyle}>
        <Button
        title="Remove all Missions"
        onPress={() => createTwoButtonAlert()}
        />
        </View> */}
      </ScrollView>
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
  },
  missionItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  missionText: {
      borderColor: '#afafaf',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      marginLeft: 10,
      minWidth: '60%'
  }
})