import {
  initializeApp
} from "firebase/app";
import {
  getAnalytics
} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHpLiqYLR-oHqM0L91mLCh9bFGspS4KeI",
  authDomain: "ravenclawgame-10672.firebaseapp.com",
  projectId: "ravenclawgame-10672",
  storageBucket: "ravenclawgame-10672.appspot.com",
  messagingSenderId: "1048126731519",
  appId: "1:1048126731519:web:cdffabd60902b01a54c8ca",
  measurementId: "G-M5JVCBGT0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);