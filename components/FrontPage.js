import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'

export default function FrontPage({navigation}) {
  const appen1 = ["InitPlanCheck",
                  "Flight type check",
                  "Airspace restriction checks",
                  "Mission preparation chcecklist",
                  "Site survey checklist"];
  const appen2 = ["OnsiteOperation"]
  

  return (
    <View>
      <Text>FrontPage</Text>
      <Pressable style={styles.buttonStyle}>
        <Button
            title="Planning"
            onPress={()=> navigation.navigate('Appendix',{topHeader:"appen1/", title:0, appenHeader:appen1})}>   {/* title is index of selected header*/}
        </Button>
        <Button
            title="Flight"
            onPress={()=> navigation.navigate('Appendix',{topHeader:"appen2/", title:0, appenHeader:appen2})}>   
        </Button>
        <Button
            title="Case of Em"
            onPress={()=> navigation.navigate('Appendix',{topHeader:"caseOfEm/", title:0})}> 
        </Button>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})