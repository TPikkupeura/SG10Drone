import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import {db, LOGS} from '../firebase/Config';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../style/Style';

export default function Mission({navigation}) {

    const [newMission, setNewMission] = useState('');
    const [missions, setMissions] = useState({});
    const [date, setDate] = useState('');

    //DATE


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
          date: date,
          missionItem: newMission
        })
        setNewMission('');
      }
    }

    const MissionItem = ({missionItem: {missionItem: title, date}, id}) => {

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
      style={styles.missionContainer}
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