import { Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState} from 'react'
import {db, APPENDIX} from '../firebase/Config';
import styles from '../style/Style';

export default function EmTitles({route}) {
  
  const [lowerTitles, setLowerTitles] = useState({});
  const [show, setShow] = useState(false);
  const {title} = route.params
  const [titleT, setTitleT] = useState(null);

  useEffect(() => {
    db.ref(APPENDIX).child('caseOfEm').child(title).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let titleItems = {...data};
      setLowerTitles(titleItems);
    });
  }, []);

  const EmItem = ({emItem: {sentence: title, predefined}, id}) => {
        
    const RendEm = () => {
      let rendArr = [];
          for(let i = 0; i < predefined.length; i++){
            if(title === titleT){
            rendArr.push(<Text
                            key={i}
                            style={[styles.EmInformation]}
                            >
                        {predefined[i]}
                        </Text>);
        }
    }
      return rendArr;
  }

  console.log(id);
   return (
       <View style={styles.container}>
           <TouchableOpacity
            style={styles.EmBtn}
            onPress={() => {setShow(!show); setTitleT(title)}}>
               <Text>{title}</Text>
           </TouchableOpacity>
           {show && (
                <RendEm/>
           )}
       </View>
   );
}

  let EmTitleKeys = Object.keys(lowerTitles);

  return (
    <View style={styles.newItem}>
         {EmTitleKeys.length > 0 ? (
          EmTitleKeys.map(key => (
            <EmItem
                key={key}
                id={key}
                emItem={lowerTitles[key]}
            />
          ))
        ) : (
          <Text style={styles.infoText}>There are no missions</Text>
        )}
    </View>
  )
}