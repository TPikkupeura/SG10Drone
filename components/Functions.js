import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase ,USERS} from '../firebase/Config';
import '../components/Global';

export const getUser = async () => {
  try {
    return AsyncStorage.getItem(storageKey)
    .then(req => JSON.parse(req))
    .then(json => {
      return json;
    })
  } catch (e) {
    console.log('No user!');
    console.log(e);
  }
}

export const setUser = (json) => {
  AsyncStorage.setItem(storageKey,json);
}

export const getNickNameForEmail= async (email) => {
  const documentSnapshot =  await firebase.firestore().collection(USERS).doc(email).get(); //.then(documentSnapshot => {
  return documentSnapshot.data().nickname;
}


/* export const convertFirebaseTimeStampToJS = (time) => {    
  if (time !== null && time !== undefined) {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000,
    );
    return fireBaseTime.getDate() + '.' + 
      (fireBaseTime.getMonth() + 1) + '.' +   
      fireBaseTime.getFullYear() + ' ' + 
      fireBaseTime.getHours() + '.' + 
      String(fireBaseTime.getMinutes()).padStart(2,'0') + '.' + 
      String(fireBaseTime.getSeconds()).padStart(2,'0');
  }
} */