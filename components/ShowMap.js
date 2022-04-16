import React, { useState, useEffect, useRef} from 'react';
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
  const [region, setRegion] = useState({
                                        latitude: 65.05874942895484,
                                        longitude: 25.457204312039572,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                        });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState("Waiting for signal..");
  const [sw, setSw] = useState(false);
  const [current, setCurrent] = useState(false);
  const mapRef = useRef(null);

  const show = () => {
    setSw(!sw);
  }
  useEffect(() => {
    if(sw){
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
          setText("Position loaded");
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            })
        }
      })();
    }
  }, [sw]);

  useEffect(()=>{

  },[])

  const goToCurrent = () => {
    setCurrent(true);
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(region, 3 * 1000);
  };


  const renderMap = () => {
    return(
      <MapView 
        ref={mapRef}
        style={styles.map} 
        initialRegion={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        //mapType='satellite'
        >
        <Marker
          
          title="testing"
          coordinate={region}
        ></Marker>
      </MapView>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <Button title={"Show map"} color="green" onPress={show} />
      <Button onPress={() => goToCurrent()} title="Go to Current pos" />
      <Text style={styles.paragraph}>{sw?text:null}</Text>
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