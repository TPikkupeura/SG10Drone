
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
  missionContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 30,
    height: '20%',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 30,
  },
  newItem: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#afafaf",
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 18
  },
  missionItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  missionText: {
      borderColor: '#afafaf',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      marginLeft: 10,
      minWidth: '60%'
  }
});