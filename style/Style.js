
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
    backgroundColor: "#71A1E3",
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
    backgroundColor: "#71A1E3",
  },

  btnContainer: {
    width: "200%",
    alignContent: "center",
    alignItems: "center",
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

  MissionBtn: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#71A1E3",
  },

  missionContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    height: '20%',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
  },
  newItem: {
    marginVertical: 10,
    alignItems: 'center',
  
    justifyContent: 'center',
  },
  infoText: {
    marginVertical: 10,
    alignItems: 'center',
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
      marginRight: 20,
      marginLeft: 20,
      minWidth: '70%'
  }
});