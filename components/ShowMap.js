import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const INITIAL_LATITUDE = 65.05874942895484;
const INITIAL_LONGTITUDE = 25.457204312039572;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGTITUDE_DELTA = 0.0421;

export default function ShowMap() {
  const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(INITIAL_LONGTITUDE);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState("Waiting..");
  const [sw, setSw] = useState(false);

  const show = () => {
    setSw(!sw);
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (errorMsg) {
        setText(errorMsg);
      } else if (location) {
        setText(JSON.stringify(location));
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();
  }, []);

  useEffect(()=>{

  },[])

  const renderMap = () => {
    return(
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta:  INITIAL_LONGTITUDE_DELTA,
        }}
        //mapType='satellite'
        >
        <Marker
          
          title="testing"
          coordinate={{latitude: latitude, longitude: longitude}}
        ></Marker>
      </MapView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <View style={styles.statusBar}></View>
      <Button title={"Get Current possition"} color="yellow" onPress={show} />
      {sw?renderMap():null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  statusBar:{
    height: Constants.statusBarHeight,
  }
});