import { StyleSheet, Text, View, TextInput, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect}from 'react';

/* type:text... datas:jsonObject sentence:sentenceInObject modify:function loadedValue:valueFromJsonObject
 */
export default function InputMethod({type, datas, sentence, modify, loadedValue}) {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState("");
    const [changeOnDate, setChangeOnDate] = useState(false);
    const [defValue, setDefValue] = useState(loadedValue); //defValue inicialize loadedValue


    const showPicker = () => {
        setIsPickerShow(!isPickerShow);
      };
    
      const onChange = (event, value) => {
        setChangeOnDate(true); //allow acess to write date to json
        setDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };
      function parseDate(date){
        if(date != ""){
            var month = (date.getMonth().toString().length < 2 ? "0"+(date.getMonth()+1).toString() :date.getMonth()+1);
            var day = (date.getDate().toString().length < 2 ? "0"+date.getDate().toString() :date.getDate());
            return(day+" "+month);
            }
        else{
          return parseDate(defValue); //this will bring back date value if user moving to home screen
        }

        }

      useEffect(()=>{
        if(changeOnDate){
          modify(datas,sentence,date);
          setChangeOnDate(false);
        }
        setDefValue(date);
      },[date])
      useEffect(()=>{
        setDefValue(loadedValue);
      },[])

    if(type === "text"){
        return (
            <TextInput
            style={[styles.gameinfo, {color:"red"}]}
            returnKeyType="next"
            placeholder={loadedValue}
            autoCapitalize="words"
            editable={true}
            onChangeText={text => modify(datas,sentence,text)}
            onSubmitEditing={()=> null} //optional
            />
        )
        }
    if(type === "date"){
        return(
            <View>
                <Text>{(defValue.length === 24)?parseDate(new Date(defValue)):(defValue != "input")?parseDate(date):""}</Text>
              <View styled={styles.btnContainer}>
                <Button title={isPickerShow?"OK":"Select Date"} color="purple" onPress={showPicker} />
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
          </View>
        )
        }

    return(
        <></>
    )

}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',

    },
    pickedDateContainer: {
      backgroundColor: '#eee',
      borderRadius: 10,
    },
    pickedDate: {
      fontSize: 18,
      color: 'black',
    },
    btnContainer: {
  
    },
    // This only works on iOS
    datePicker: {
      width: 320,
      height: 260,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  });