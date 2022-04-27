import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const Separator = () => (
  <View style={styles.separator} />
);

export default function FrontPage({route, navigation}) {
  const appen1 = ["InitPlanCheck",
                  "Flight type check",
                  "Airspace restriction checks",
                  "Mission preparation chcecklist",
                  "Site survey checklist"];
  const appen2 = ["AircraftVisualInspection",
                  "OnsiteOperation",
                  "PostMission",
                  "PreFlightChecklist",
                  "PreFlightPreparationOnSite",
                  "WhileOnFlight"]
  const {missionId} = route.params;
  return (
    <View style={styles.buttonStyle}>
    
      
        <TouchableOpacity style={styles.Btn}
       onPress={()=> navigation.navigate('Appendix',{topHeader:"appen1/", title:0, appenHeader:appen1, misId:missionId})}>  
         <Text style={styles.loginText}>Planning</Text>
       </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}
       onPress={()=> navigation.navigate('Appendix',{topHeader:"appen2/", title:0, appenHeader:appen2, misId:missionId})}>    
         <Text style={styles.loginText}>Flight</Text>
       </TouchableOpacity>
      

        <TouchableOpacity style={styles.Btn}
       onPress={()=> navigation.navigate('Appendix',{topHeader:"caseOfEm/", title:0})}> 
         <Text style={styles.loginText}>Case of Emergency</Text>
       </TouchableOpacity>
      

    </View>
  )
}

const styles = StyleSheet.create({

  buttonStyle: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
     
  Btn: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#71A1E3"

  },

})