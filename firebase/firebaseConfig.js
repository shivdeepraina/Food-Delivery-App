import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC63Yc-28vfdpc-g9PU-5w4LBZtSAz8Kho",
  authDomain: "foodapp-fe3ee.firebaseapp.com",
  projectId: "foodapp-fe3ee",
  storageBucket: "foodapp-fe3ee.appspot.com",
  messagingSenderId: "177887365670",
  appId: "1:177887365670:web:19f0cf08617d55825274e7",
  measurementId: "G-T198BJN651"
};

// Initialize Firebase
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }