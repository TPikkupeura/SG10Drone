import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import ShowMap from '../components/ShowMap'
import uuid from 'react-native-uuid';

export const Title_Input = ({sentence: {sentence: title, inputType: inputType, predefined: predefined }, id, answ, setAnsw}) => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState("");
    const [changeOnDate, setChangeOnDate] = useState(false);
    const [posNotes, setPosNotes] = useState(false);

    function addElement (ElementList, element) {
        let newList = Object.assign(ElementList, element)
        return newList
    }
    function saveInput(input){
        let answers = {...answ};
        if(posNotes){
            let inp = input;
            addElement(inp,{"notes":posNotes});
            addElement(answers, {[id]:inp});
        }
        else{addElement(answers, {[id]:input})}
        setAnsw(answers);
    }

    useEffect(()=>{
        if(inputType === "gps"){
            if(answ.hasOwnProperty(id)){
                if(answ[id].hasOwnProperty("notes")){
                    setPosNotes(answ[id].notes);
                }
            }
        }
    },[])

    useEffect(()=>{
        if(inputType === "gps" && posNotes){
            let answers = {...answ};
            if(answ.hasOwnProperty(id)){
                if(answ[id].hasOwnProperty("latitude")){
                    addElement(answers, {
                        [id]:{"notes":posNotes,
                        latitude: answ[id].latitude,
                        longitude: answ[id].longitude
                        }}
                        )
                }
                else{
                    addElement(answers, {[id]:{"notes":posNotes}})
                }
            }
            else{
                addElement(answers, {[id]:{"notes":posNotes}})

            }
            setAnsw(answers);
        }
    },[posNotes])


    const existGps = () => {
        if(answ.hasOwnProperty(id)){
            if("latitude" in answ[id]){
            return true;
            }
        }
        return false;
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
            minWidth: '60%',
            width: '90%',
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
                key={uuid.v4()}
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
                key={uuid.v4()}
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
                    key={uuid.v4()}
                    buttonStyle={{width: '100%'}}
                    data={predefined}
                    defaultButtonText={(answ[id] === undefined)?"Select an option.":answ[id]}
                    onSelect={(selectedItem, index) => {
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
                    <Text key={uuid.v4()}>{answ[id]}</Text>
                  <View styled={styles.btnContainer}>
                    <Button key={uuid.v4()} title={"Select Date"} color="purple" onPress={showPicker} />
                {isPickerShow && (
                  <DateTimePicker
                    key={uuid.v4()}
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
                    <TextInput
                    key={uuid.v4()}
                    style={[styles.text, {color:"red"}]}
                    returnKeyType="next"
                    placeholder={posNotes? posNotes : "Location notes"}
                    placeholderTextColor={(null !== "input")?"red":"gray"} 
                    autoCapitalize="words"
                    editable={true}
                    onChangeText={text => setPosNotes(text)}
                    onSubmitEditing={()=> null} //optional
                />
                    {existGps()?<Text>{"la: " + (answ[id].latitude).toFixed(4)+" " + 
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
        <View>
            <View style={styles.Item}>
                <Text 
                    key={uuid.v4()}
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