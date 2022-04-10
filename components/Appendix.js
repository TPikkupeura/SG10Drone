import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {db, APPENDIX} from '../firebase/Config';
import { useEffect, useState } from 'react';
import { Title_Input } from './Title_Input';

export default function Appendix({route, navigation}) {
  const [data, setData] = useState({});
  const { title, topHeader, appenHeader } = route.params;
  const [titleNum, setTitleNum] = useState(title); // copy constant title to titleNum

  useEffect(() =>{
    db.ref(APPENDIX+topHeader+appenHeader[titleNum]).on('value', querySnapShot=>{
      let data = querySnapShot.val() ? querySnapShot.val(): {};
      let firebaseData = {...data};
      setData(firebaseData);
    });
  },[titleNum]);

  const titleSwitch = () =>{  // temporary title switch
    let len = appenHeader.length;
    if(titleNum < len-1){setTitleNum(titleNum+1)}
    else{setTitleNum(0)}
  }

  let dataKeys = Object.keys(data);

   return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <Button title={"NextPage"} color="blue" onPress={titleSwitch} />  
      <View style={styles.buttonStyle}>
        <ScrollView>
          {dataKeys.length > 0 ? (
            dataKeys.map(key => (
              <Title_Input
                id={key}
                sentence={data[key]}
                />
            ))
          ) : (
            <Text style={styles.infoText}>NO ITEMS (sentences)? / LOADING</Text>
          )
        }
        </ScrollView>
      </View>
    </View>
   );
   }

const styles = StyleSheet.create({
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
    marginLeft: 10,

  },
});
