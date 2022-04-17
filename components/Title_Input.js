import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import ShowMap from '../components/ShowMap'

export const Title_Input = ({sentence: {sentence: title, inputType: inputType, predefined: predefined }, id, answ, setAnsw}) => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState("");
    const [changeOnDate, setChangeOnDate] = useState(false);

    function addElement (ElementList, element) {
        let newList = Object.assign(ElementList, element)
        return newList
    }
    function saveInput(input){
        let answers = {...answ};
        addElement(answers, {[id]:input})
        setAnsw(answers);
    }
   
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

      const onChange = (event, value) => {
        saveInput((parseDate(value)));
        console.log(parseDate(value));
        setDate(value);
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
                placeholder={(answ[id] != undefined)? answ[id] : "Empty"}
                placeholderTextColor={(null !== "input")?"red":"gray"} 
                autoCapitalize="words"
                editable={true}
                onChangeText={text => saveInput(text)}
                onSubmitEditing={()=> null} //optional
                />
            )
            }
        }
    const inputCheck = () => {
        if(inputType === "check"){
            return(
                <Checkbox
                status={(answ[id] === "checked")? 'checked' : 'unchecked'}
                color='red'
                onPress={() => {
                    (answ[id] === undefined || answ[id] === "unchecked")? saveInput("checked"): saveInput("unchecked")
                }}
             />
             )
            }
    }
    
    const inputSelect = () => {
        if(inputType === "select"){
            return(
                <SelectDropdown
                    buttonStyle={{width: '100%'}}
                    data={predefined}
                    defaultButtonText={(answ[id] === undefined)?"Select an option.":answ[id]}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        saveInput(selectedItem);
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
    }

    const inputDate = () => {
        if(inputType === "date"){
            return(
                <View style={styles.text}>
                    <Text>{answ[id]}</Text>
                  <View styled={styles.btnContainer}>
                    <Button title={"Select Date"} color="purple" onPress={showPicker} />
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
    }

    const inputMap = () => {
        if(inputType === "gps"){
            return(
                <>
                {answ[id]?<Text>{"la: " + (answ[id].latitude).toFixed(4)+" " + 
                                          "lo: " + (answ[id].longitude).toFixed(4)}
                                    </Text>:null}
                <ShowMap
                    saveGps={saveInput}
                    loadedGps={(answ[id] != undefined)? answ[id] : {}}
                />
                </>
            )
        }
    }

    //console.log(id);
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
                {inputCheck()}
            </View>
            {inputText()}
            {inputDate()}
            {inputSelect()}
            {inputMap()}
        </View>
   )

}