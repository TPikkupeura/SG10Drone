import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

/* type:text... datas:jsonObject sentence:sentenceInObject modify:function loadedValue:valueFromJsonObject
 */
export default function InputMethod({type, datas, sentence, modify, loadedValue}) {
    if(!loadedValue) loadedValue = "INPUTTTT???";
    if(type === "text"){
        return (
            <TextInput
            style={[styles.gameinfo, {color:"red"}]}
            returnKeyType="next"
            placeholder={loadedValue}
            autoCapitalize="words"
            editable={true}
            onChangeText={text => modify(datas,sentence,text)}
            onSubmitEditing={()=> false} //optional
            />
        )
        }
}

const styles = StyleSheet.create({})