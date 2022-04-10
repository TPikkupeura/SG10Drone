import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import {db, APPENDIX} from '../firebase/Config';

export const Title = ({sentence: {sentence: title, value}, id}) => {


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
            marginRight: 10,
            marginLeft: 10,
            minWidth: '60%'
        }
    });

    return(
        <View style={styles.Item}>
            <Text 
                style={
                    [styles.text,
                    {backgroundColor: "lightblue"}]
                }>
                {title}
            </Text>
        </View>
    )

}