import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy-5GWBUt2Be8tUiNC2ulfVrguwkqWJzk",
  authDomain: "amclone-e4161.firebaseapp.com",
  databaseURL: "https://amclone-e4161.firebaseio.com",
  projectId: "amclone-e4161",
  storageBucket: "amclone-e4161.appspot.com",
  messagingSenderId: "657043792671",
  appId: "1:657043792671:web:bb55f8029a1c577cf5c62a",
  measurementId: "G-SMNJTQW0YZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebaseApp.firestore();
const firebaseAuth = firebase.auth();

export { firebaseDb, firebaseAuth };
