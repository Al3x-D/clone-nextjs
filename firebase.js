import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clone-nextjs-b21a1.firebaseapp.com",
  projectId: "clone-nextjs-b21a1",
  storageBucket: "clone-nextjs-b21a1.appspot.com",
  messagingSenderId: "809779001925",
  appId: "1:809779001925:web:7e944a5f65562f6a1ec12c"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();

