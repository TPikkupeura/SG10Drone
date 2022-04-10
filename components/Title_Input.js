import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Button } from 'react-native';
import {db, APPENDIX} from '../firebase/Config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';

export const Title_Input = ({sentence: {sentence: title, inputType: inputType, predefined: predefined }, id}) => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState("");
    const [changeOnDate, setChangeOnDate] = useState(false);

    const styles = StyleSheet.create({
        Item: {
            flexDirection: 'row',
            marginVertical: 10,
            alignItems: 'center'
        },
        text: {
            borderColor: '#afafaf',
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderWidth: 1,
            borderRadius: 5,
            minWidth: '60%'
        },
        datePicker: {
            width: 320,
            height: 260,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          },
    });
    //console.log(predefined);

    const showPicker = () => {
        setIsPickerShow(!isPickerShow);
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

    const inputText = () => {
        if(inputType === "text"){
            return (
                <TextInput
                style={[styles.text, {color:"red"}]}
                returnKeyType="next"
                placeholder={"Default text input"}
                placeholderTextColor={(null !== "input")?"red":"gray"} 
                autoCapitalize="words"
                editable={true}
                onChangeText={text => null}
                onSubmitEditing={()=> null} //optional
                />
            )
            }
        }
    const inputCheck = () => {
        if(inputType === "check"){
            return(
                <Checkbox
                status={null ? 'checked' : 'unchecked'}
                color='red'
                onPress={() => {
                 null;
                }}
             />
             )
            }
    }
    
    const inputDate = () => {
        if(inputType === "date"){
            return(
                <View style={styles.text}>
                    {/* <Text>{(defValue.length === 24)?parseDate(new Date(defValue)):(defValue != "input")?parseDate(date):""}</Text> */}
                  <View styled={styles.btnContainer}>
                    <Button title={isPickerShow?"OK":"Select Date"} color="purple" onPress={showPicker} />
                {isPickerShow && (
                  <DateTimePicker
                    value={new Date(Date.now())}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={null}
                    style={styles.datePicker}
                  />
                )}
                 </View>
              </View>
            )
            }
    }
    console.log(id);
    return(
        <View >
            <View style={styles.Item}>
                <Text 
                    style={
                        [styles.text,
                        {backgroundColor: "lightblue"}]
                    }>
                    {title}
                </Text>
                <Text> {id}</Text>
                {inputCheck()}
            </View>
            {inputText()}
            {inputDate()}
        </View>
   )

}