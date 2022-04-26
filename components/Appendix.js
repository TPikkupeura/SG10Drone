import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {db, APPENDIX} from '../firebase/Config';
import { useEffect, useState } from 'react';
import { Title_Input } from './Title_Input';
import uuid from 'react-native-uuid';

export default function Appendix({route, navigation}) {
  const [data, setData] = useState({});
  const { title, topHeader, appenHeader } = route.params;
  const [titleNum, setTitleNum] = useState(title); // copy constant title to titleNum
  const [userId, setUserId] = useState("userId"); //here needs to be user key for now is constant
  const [missionId, setMissionId] = useState("-N-XcaK33eNw6hOqb10k") // static mission 7 for now
  const [missionDate, setMissionDate] = useState("12-12-2022") //for now
  const [answers, setAnswers] = useState({})

  function authorizeAccess(){
    let dbUserId;
    db.ref("missions").child(missionId).child("userId").on('value', (snapshot)=> {dbUserId = snapshot.val();});
    if(dbUserId === userId){return true}
    else{return false};
  }

  function saveAnswers(){
    let dbUserId;
    db.ref("missions").child(missionId).child("userId").on('value', (snapshot)=> {dbUserId = snapshot.val();});
    if(authorizeAccess()){
    let answ = Object.keys(answers);  
      answ.map(key => (
          db.ref("missions").child(missionId).child("date").child(missionDate).child(key).set(
            answers[key]
          )
          ))
        }
    }

    const checkIfAnsw = () => {
      let override = false;
      function setOverride(){
        let len = appenHeader.length;
        if(titleNum < len-1){setTitleNum(titleNum+1)}
        else{setTitleNum(0)}
      }
      function unsetOverride(){override = false}
      let answ = Object.keys(answers); 
      let needToBeAnsw = [];
      let item;
        for(item in data){
          if(answ.includes(item)){
            if(answers[item] === "unchecked"){
              //console.log(item + " unchecked");
              needToBeAnsw.push(data[item].sentence);
              continue;
            }
            //console.log(item + " answered");
          }
          else{
            //console.log(item + " not answered");
            needToBeAnsw.push(data[item].sentence);
          }
        }
        if(needToBeAnsw.length){
          //alert(needToBeAnsw.join("\n"));
          let message = needToBeAnsw.join(".\n");
          Alert.alert(
            "You did not enter values for this:",
            message,
          [
            {
              text: "Continue",
              onPress: () => setOverride()
            },
            {
              text: "Add answers",
              onPress: () => unsetOverride()
            }
          ]
          );
        }
        else{setOverride()}
        return override;
    }
  
  useEffect(()=>{
    if(authorizeAccess){ //store answers from db to answers useState
      db.ref("missions").child(missionId).child("date").child(missionDate).on('value', (snapshot)=> {setAnswers(snapshot.val());});
    }
    //console.log(answers); //loaded answers from db
    // db.ref("missions").child(missionId).child("date").child(missionDate).on('value', (snapshot)=> {console.log(snapshot.val());});
  },[])

  useEffect(() =>{
    navigation.setOptions({ title: appenHeader[titleNum]});
    db.ref(APPENDIX+topHeader+appenHeader[titleNum]).on('value', querySnapShot=>{
      let data = querySnapShot.val() ? querySnapShot.val(): {};
      let firebaseData = {...data};
      setData(firebaseData);
      saveAnswers();
    });
  },[titleNum]);

  const titleSwitch = () =>{  // temporary title switch
    if(checkIfAnsw()){
      let len = appenHeader.length;
      if(titleNum < len-1){setTitleNum(titleNum+1)}
      else{setTitleNum(0)}
    }
  }

  let dataKeys = Object.keys(data);

   return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <Button key={uuid.v4()} title={"NextPage"} color="blue" onPress={titleSwitch} />
      <Button key={uuid.v4()} title={"SaveToDB"} color="blue" onPress={saveAnswers} />  
      <View style={styles.buttonStyle}>
        <ScrollView style={styles.scroll}>
          {dataKeys.length > 0 ? (
            dataKeys.map(key => (
              <View key={key}>
              <Title_Input
                id={key}
                answ={answers}
                setAnsw={setAnswers}
                sentence={data[key]}
                />
                </View>
            ))
          ) : (
            <Text key={uuid.v4()} style={styles.infoText}>NO ITEMS (sentences)? / LOADING</Text>
          )
        }
        </ScrollView>
      </View>
    </View>
   );
   }

const styles = StyleSheet.create({
  scroll : {
    height: '89%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '20%',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
  },
  infoText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 15
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,

  },
});