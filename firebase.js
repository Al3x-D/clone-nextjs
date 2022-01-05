import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrImvtspAO-oIFbP7V9ZAB_RKaLr0I1Ro",
  authDomain: "amzn2-13ab8.firebaseapp.com",
  projectId: "amzn2-13ab8",
  storageBucket: "amzn2-13ab8.appspot.com",
  messagingSenderId: "505681747940",
  appId: "1:505681747940:web:8b7c76c8f71592225d71f1"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();

//OLD firebase

// const firebaseConfig = {
//   apiKey: "AIzaSyA0bA0wEY-9kJbbY90VJ1FXvrXtA4w4USg",
//   authDomain: "amzn-2-f701f.firebaseapp.com",
//   projectId: "amzn-2-f701f",
//   storageBucket: "amzn-2-f701f.appspot.com",
//   messagingSenderId: "1045212442340",
//   appId: "1:1045212442340:web:69a3d0bcc4d9e0199b06f1"
// };
