import React, { useState, useEffect, useRef} from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import uuid from 'react-native-uuid';

const INITIAL_LATITUDE = 65.05874942895484;
const INITIAL_LONGTITUDE = 25.457204312039572;

export default function ShowMap({saveGps, loadedGps}) {
  const [region, setRegion] = useState({
                                        latitude: 65.05874942895484,
                                        longitude: 25.457204312039572,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                        });
  const [marker, setMarker] = useState(null);
  const [latTextIn, setLatTextIn] = useState(null);
  const [lonTextIn, setLonTextIn] = useState(null);                                        
  const [gpsLoc, setGpsLoc] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState("Waiting for signal..");
  const [sw, setSw] = useState(true);
  const [swInput, setSwInput] = useState(false);
  const [current, setCurrent] = useState(false);
  const mapRef = useRef(null);

  const show = () => {
    setSw(!sw);
  }

  const showInput = () => {
    setSwInput(!swInput);
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
        if (errorMsg) {
          setText(errorMsg);
        } else if (location) {
          setText("Position loaded");
          setGpsLoc({
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
    if(latTextIn && lonTextIn)saveGps({
                      latitude:region.latitude,
                      longitude:region.longitude
                    });
    },[region])

    useEffect(()=>{
      if(marker)saveGps({
                        latitude:marker.latitude,
                        longitude:marker.longitude
                      });
      },[marker])

  useEffect(()=>{
    if((latTextIn != null) && (lonTextIn != null)){
      let lat = parseFloat(latTextIn);
      let lon = parseFloat(lonTextIn);
      let reg = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      setRegion(reg);
      show();
      //console.log(region);
    }
  },[lonTextIn])

  useEffect(()=>{
    if(loadedGps.longitude){
      setRegion({
        latitude: loadedGps.latitude,
        longitude: loadedGps.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
  },[])

  const goToCurrent = () => {
    setCurrent(true);
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(gpsLoc, 3 * 1000);
    setMarker(gpsLoc);
    setLatTextIn(null);
    setLonTextIn(null);
  };


  const renderMap = () => {
    return(
      <MapView
        ref={mapRef}
        style={styles.map} 
        initialRegion={region}
        onPress={
                (e) => {
                    //setLocation({"coords":e.nativeEvent.coordinate});
                    setMarker(e.nativeEvent.coordinate);
                    //console.log(marker);
                }}
        onRegionChangeComplete={(region) => setRegion(region)}
        //mapType='satellite'
        >
        {marker?<Marker
          title={"la: " + marker.latitude.toFixed(4) + " lo: " + marker.longitude.toFixed(4)}
          coordinate={marker}
        />:null}
      </MapView>
    )
  }

  const coordValCheck = (value, latORlon) => {
    let val = parseFloat(value);
    if(latORlon === "latitude"){
      if(val >= -90 && val <= 90){
        return true;
      }
      else {
        return Alert.alert("Latitude value is out of range, try again.")};
    }
    if(latORlon === "longitude"){
      if(val >= -180 && val <= 180){
        return true;
      }
      else {
        return Alert.alert("Longitude value is out of range, try again.")};
    }
  }

  const posInputField = () => {
    let latval;
    let lonval;
    return(<View>
              <TextInput
                key={uuid.v4()}
                style={[styles.text, {color:"black"}]}
                returnKeyType="next"
                placeholderTextColor={"red"}
                placeholder='insert latitude'
                editable={true}
                onChangeText={text => (latval=text)}
                onSubmitEditing={text => coordValCheck(latval,"latitude")?setLatTextIn(latval):null} //optional
                />
              <TextInput
                key={uuid.v4()}
                style={[styles.text, {color:"black"}]}
                placeholder='insert longitude'
                returnKeyType="next"
                placeholderTextColor={"red"}
                editable={true}
                onChangeText={text => (lonval=text)}
                onSubmitEditing={text => coordValCheck(lonval,"longitude")?setLonTextIn(lonval):null} //optional
                />
          </View>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <View style={styles.Item}>
        <Button key={uuid.v4()} onPress={() => (gpsLoc && sw )?goToCurrent():null} title="Go to actual gps position." />
      </View>
      {swInput?posInputField():null}
      <Text key={uuid.v4()} style={styles.paragraph}>{sw?text:null}</Text>
      {sw?renderMap():null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "-55%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "grey",
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
  },
  statusBar:{
    height: Constants.statusBarHeight,
  },
  text: {
    borderColor: '#afafaf',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '60%'
},
Item: {
  flexDirection: 'row',
  alignItems: 'center'
},
});