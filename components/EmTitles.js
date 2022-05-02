import { Text, View } from 'react-native'
import React, { useEffect, useState} from 'react'
import {db, APPENDIX} from '../firebase/Config';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../style/Style';

export default function EmTitles({navigation}) {
  
  const [titles, setTitles] = useState({});
  const [title, setTitle] = useState('');
  const [lowerTitles, setLowerTitles] = useState({});
  
  const RefPath = db.ref(APPENDIX).child('caseOfEm');
  let sentence;

  const InputTitles = () => {

    return(
    <View>
      {EmTitleKeys.length > 0 ? (
        EmTitleKeys.map(key => (
        <SelectDropdown
            buttonStyle={{width: '90%',
            borderRadius: 10,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            backgroundColor: "#71A1E3"
        }}
            data={RefPath.child(key).child('sentence').on('value',(snapshot)=> {sentence = snapshot.val();})}
            defaultButtonText= {key}
            onSelect={() => navigation.navigate('CaseOfEm', {title: key})}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
        ))
        ) : (
          <Text style={styles.infoText}>There are no EmTitles</Text>
        )}
    </View>
    )
  }

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
        <InputTitles/>
    </View>
  )
}