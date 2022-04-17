import React, { useState, useEffect, useRef} from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

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
  const [sw, setSw] = useState(false);
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
    if(marker)saveGps({
                      latitude:marker.latitude,
                      longitude:marker.longitude
                    });
    },[marker])

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

  const posInputField = () => {
    return(<View>
              <TextInput
                style={[styles.text, {color:"black"}]}
                returnKeyType="next"
                placeholderTextColor={"red"}
                placeholder='insert latitude'
                editable={true}
                onChangeText={text => setLatTextIn(text)}
                onSubmitEditing={()=> null} //optional
                />
              <TextInput
                style={[styles.text, {color:"black"}]}
                placeholder='insert longitude'
                returnKeyType="next"
                placeholderTextColor={"red"}
                editable={true}
                onChangeText={text => setLonTextIn(text)}
                onSubmitEditing={()=> null} //optional
                />
          </View>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <Button title={"Show/hide map"} color="green" onPress={show} />
      <Button onPress={() => (gpsLoc && sw )?goToCurrent():null} title="Go to Current pos" />
      <Button title={"Show/hide pos input field"} color="brown" onPress={showInput} />
      {swInput?posInputField():null}
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
});