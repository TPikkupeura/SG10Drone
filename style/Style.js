
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container: {
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
 },
 
 image: {
    marginBottom: 40,
  },
 
  inputView: {
    textAlign: 'center',
    backgroundColor: "#CCC",
    borderRadius: 10,
    width: "70%",
    height: 55,
    marginBottom: 20,
    alignItems: "baseline", //cant be "justify"
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    textAlign: 'justify', //cant be baseline
    padding: 10,
    marginLeft: 20,
    marginRight: 20
  },
 
 
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#CCC",
  },
});