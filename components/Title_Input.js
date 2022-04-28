import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import ShowMap from '../components/ShowMap'
import uuid from 'react-native-uuid';
import { object } from 'prop-types';

export const Title_Input = ({sentence: {sentence: title, inputType: inputType, predefined: predefined }, id, answ, setAnsw}) => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState("");
    const [changeOnDate, setChangeOnDate] = useState(false);
    const [posNotes, setPosNotes] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


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


    const showPicker = () => {
        setIsPickerShow(!isPickerShow);
      };

    const showDatepicker = () => {
        showMode('date');
      };
    
    const showTimepicker = () => {
        showMode('time');
      };
      const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };

    const formatDate = (date, time) => {
        return `${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()} ${time.getHours()<10? "0"+time.getHours(): time.getHours()}:${time.getMinutes()<10? "0"+time.getMinutes(): time.getMinutes()}`;
      };
    
      const onChange = (event, value) => {
        let today = new Date(Date.now());
        if(value.getDate() === today.getDate() && value.getMonth() === today.getMonth() && value.getFullYear() === today.getFullYear()){
            showPicker();
            saveInput((parseDate(value)));
            return;
        }
        if ((value) < (today)) {
            Alert.alert(
                "Date",
                "You selected past date, please correct the date",
              [
                {
                  text: "Ok",
                  onPress: () => setShow(true)
                }
              ]
              );
            return;
        }
        showPicker();
        saveInput((parseDate(value)));
      };

      const onChange2 = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        const selectedTime = selectedValue || new Date();
        if (mode == 'date') {
          const currentDate = selectedValue || new Date();
          if (selectedValue < (new Date(Date.now()))) {
            Alert.alert(
                "Date",
                "You selected past date, please try again.",
              [
                {
                  text: "Ok",
                  onPress: () => null
                }
              ]
              );
            return;
        }
          setDate(currentDate);
          setMode('time');
          setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
        } else {
          //console.log(selectedTime);
          setShow(Platform.OS === 'ios');
          setMode('date');
        }
        selectedTime.setHours(selectedTime.getHours() - 2);
        saveInput(formatDate(date, selectedTime));
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
                {isPickerShow?(
                  <DateTimePicker
                    key={uuid.v4()}
                    value={new Date(Date.now())}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                  />
                ):null}
                 </View>
              </View>
            )
            }
    }

    const inputDateTime = () => {
        if(inputType === "datetime"){
            return(
                <View style={styles.text}>
                    <Text key={uuid.v4()}>{answ[id]}</Text>
                    <View styled={styles.btnContainer}>
                        <Button key={uuid.v4()} color="purple" onPress={showDatepicker} title="SELECT DATE AND TIME" />   
                    <View>
                </View>

                {show?(
                  <DateTimePicker
                    key={uuid.v4()}
                    timeZoneOffsetInMinutes={0}
                    value={new Date(Date.now())}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange2}
                    style={styles.datePicker}
                  />
                ):null}
                 </View>
              </View>
            )
            }
    }

    const inputMap = () => {
        if(inputType === "gps"){
            return(
                <>
                    <Text>Position notes:</Text>
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
            {inputDateTime()}
            {inputSelect()}
            {inputMap()}
        </View>
   )

}