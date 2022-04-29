import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './components/Login';
import FrontPage from './components/FrontPage';
import Appendix from './components/Appendix';
import Mission from './components/Mission';
import EmTitles from './components/EmTitles';
import CaseOfEm from './components/CaseOfEm'

const Stack = createNativeStackNavigator();

export default function App(){
  
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerShown: true}}>
                <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
                <Stack.Screen name="Mission" component={Mission} options={{headerShown: true}}/>
                <Stack.Screen name="FrontPage" component={FrontPage} options={{headerShown: true}}/>
                <Stack.Screen name="Appendix" component={Appendix} options={{headerShown: false}}/>
                <Stack.Screen name="EmTitles" component={EmTitles} options={{headerShown: true}}/>
                <Stack.Screen name="CaseOfEm" component={CaseOfEm} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
