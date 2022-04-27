import { Text, View, Button, TextInput, Alert, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {db, LOGS, DRONES} from '../firebase/Config';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../style/Style';

export default function Mission({navigation}) { 

    const [newMission, setNewMission] = useState('');
    const [missions, setMissions] = useState({});
    const [missionDate, setMissionDate] = useState('');
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [drone, setDrone] = useState('');
    const [drones, setDrones] = useState({});
    const [userId, setUserId] = useState("test1"); // TEMPORARY

    //const { loginEmail } = require('../components/Login');

    //DRONES
    const inputDrone = () => {
          return(
              <SelectDropdown
                  buttonStyle={{width: '90%',
                  borderRadius: 10,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  backgroundColor: "#71A1E3"
              }}
                  data={droneKeys}
                  defaultButtonText= "SELECT A DRONE"
                  onSelect={(selectedItem, index) => {
                      setDrone(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                      return item
                  }}
              />
          )
  }


    //DATE
    const showPicker = () => {
      setIsPickerShow(!isPickerShow);
    };

    const onChange = (event, value) => {
      setMissionDate((parseDate(value)));
      if (Platform.OS === 'android') {
        setIsPickerShow(false);
      }
    };

    function parseDate(date){
        if(date != ""){
            var year = date.getFullYear()
            var month = (date.getMonth().toString().length < 2 ? "0"+(date.getMonth()+1).toString() :date.getMonth()+1);
            var day = (date.getDate().toString().length < 2 ? "0"+date.getDate().toString() :date.getDate());
            return(day+"-"+month+"-"+year);
            }
        }

    //TEH DRONE PICKER
      const inputMissionDate = () => {
              return(
                  <View style={styles.MissionBtn}>
                  <TouchableOpacity style={styles.MissionBtn}
                  onPress={showPicker}>
                  <Text style={styles.loginText}>SELECT MISSION DATE</Text>
                  </TouchableOpacity>

                {isPickerShow && (
                  <DateTimePicker
                    value={new Date(Date.now())}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                  />
                )}
                 </View>
            )
            }


    useEffect(() => {
      db.ref(LOGS).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let missionItems = {...data};
        setMissions(missionItems);
      });
      db.ref(DRONES).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let droneItems = {...data};
        setDrones(droneItems);
      });
    }, []);

    function addNewMission() {
      if(newMission.trim() !== "") {
        db.ref(LOGS).push({
          date: missionDate,
          missionItem: newMission,
          drone: drone,
          userId: userId,
          answers: ""
        })
        setNewMission('');
        setMissionDate('');
        setDrone('');
      }
    }

    const MissionItem = ({missionItem: {missionItem: title, date, drone}, id}) => {
      
       const onRemove = () => {
          db.ref(LOGS + [id]).remove();
      };

      const createTwoButtonAlert = () => Alert.alert(
        "Missions", "Remove mission?", [{
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => onRemove()
        }],
        { cancelable: false}
      );
      

      return (
          <View style={styles.missionItem}>
              <Pressable onPress={() => navigation.navigate("FrontPage", {missionId: id})}>
                <View style={styles.missionText}>
                  <Text>{title}</Text>
                  <Text>{date}</Text>
                  <Text>Drone: {drone}</Text>
                </View>
              </Pressable>
              <Pressable>
                  <Entypo name={'trash'} size={32} onPress={createTwoButtonAlert}/>
              </Pressable>
          </View>
      );
  }

  let missionKeys = Object.keys(missions);
  let droneKeys = Object.keys(drones);
  
      //THREE BUTTONS
  return (
    <View>
      <View style={styles.newItem}>
        <TextInput
          style={styles.input}
          onChangeText={setNewMission}
          value={newMission}
          placeholder="New Mission Title"
        />
        {inputDrone()}
        <Text>{missionDate}</Text>
        {inputMissionDate()}
      <View style={styles.MissionBtn}>

        <TouchableOpacity style={styles.MissionBtn}
        onPress={()=> addNewMission()}>
        <Text style={styles.loginText}>CREATE NEW MISSION</Text>
        </TouchableOpacity>


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
      </ScrollView>
      </View>
    </View>
  )
}