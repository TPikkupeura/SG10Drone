import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './components/Login';
import FrontPage from './components/FrontPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Appendix from './components/Appendix';
import Mission from './components/Mission';

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShow: false}}/>
                <Stack.Screen name="Mission" component={Mission} options={{headerShow: false}}/>
                <Stack.Screen name="FrontPage" component={FrontPage} options={{headerShow: false}}/>
                <Stack.Screen name="Appendix" component={Appendix} options={{headerShow: false}}/>
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
