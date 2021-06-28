import firebase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId:process.env.REACT_APP_MID
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const beaconsRef = databaseRef.child("beacons")
export const increment = firebase.database.ServerValue.increment(1)
export default firebase;