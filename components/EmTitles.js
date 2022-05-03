import { Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState} from 'react'
import {db, APPENDIX} from '../firebase/Config';
import styles from '../style/Style';

export default function EmTitles({navigation}) {
  
  const [titles, setTitles] = useState({});

  useEffect(() => {
    db.ref(APPENDIX).child('caseOfEm').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let titleItems = {...data};
      setTitles(titleItems);
    });
  }, []);

  let EmTitleKeys = Object.keys(titles);

  return (
    <View style={styles.newItem}>
         {EmTitleKeys.length > 0 ? (
          EmTitleKeys.map(key => (
            <TouchableOpacity 
            onPress={()=> navigation.navigate('LowerEmTitles', {title: key})}
            style={styles.MissionBtn}
            key={key}
            id={key}>
              <Text>{key}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.infoText}>There are no missions</Text>
        )}
    </View>
  )
}