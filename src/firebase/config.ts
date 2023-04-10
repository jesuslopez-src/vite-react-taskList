// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWlarCZwHVSRkLrlU_PofyksTJE1VM9YI",
  authDomain: "react-test-19e70.firebaseapp.com",
  databaseURL: "https://react-test-19e70-default-rtdb.firebaseio.com",
  projectId: "react-test-19e70",
  storageBucket: "react-test-19e70.appspot.com",
  messagingSenderId: "380506153335",
  appId: "1:380506153335:web:cb29148c3794c387f48172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lf_7K4kAAAAAEjGy4MG2tveLvnzisQp5yBv4ECE'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
export const db = getFirestore(app);