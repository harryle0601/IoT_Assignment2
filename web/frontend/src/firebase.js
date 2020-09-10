import firebase from "firebase";

const config = {
    apiKey: "AIzaSyB6_pMrQeJZUadK72Dy1ljfgYDu8jrf4jM",
    authDomain: "iotassignment2-d4c67.firebaseapp.com",
    databaseURL: "https://iotassignment2-d4c67.firebaseio.com",
    projectId: "iotassignment2-d4c67",
    storageBucket: "iotassignment2-d4c67.appspot.com",
    messagingSenderId: "421326197012",
    appId: "1:421326197012:web:8f8b8308d7f5a8e1ebb201",
    measurementId: "G-DQS4MS2J7W"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();

export {firebase as default, auth, db, storage} ;