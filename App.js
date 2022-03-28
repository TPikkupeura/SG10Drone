import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './components/Login';
import FrontPage from './components/FrontPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Apix1Planning from './components/Apix1Planning';
import Apix2Flight from './components/Apix2Flight';
import Appix3CaseOfEm from './components/Apix3CaseOfEm';

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShow: false}}/>
                <Stack.Screen name="FrontPage" component={FrontPage} options={{headerShow: false}}/>
                <Stack.Screen name="Header" component={Header} options={{headerShow: false}}/>
                <Stack.Screen name="Footer" component={Footer} options={{headerShow: false}}/>
                <Stack.Screen name="Apix1Planning" component={Apix1Planning} options={{headerShow: false}}/>
                <Stack.Screen name="Apix2Flight" component={Apix2Flight} options={{headerShow: false}}/>
                <Stack.Screen name="Apix3CaseOfEm" component={Appix3CaseOfEm} options={{headerShow: false}}/>
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
