import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import { db, ROOT_REF} from '../firebase/Config';

export const MissionItem = ({missionItem: {missionItem: title, done}, id}) => {

    const [doneState, setDone] = useState(done);
}