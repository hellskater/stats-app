import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyARIZQ2zeffLAc6nXbZMkwoTxHz7F_Be1s",
  authDomain: "milan-assignment.firebaseapp.com",
  projectId: "milan-assignment",
  storageBucket: "milan-assignment.appspot.com",
  messagingSenderId: "924291670273",
  appId: "1:924291670273:web:2dc4a98bd31bb98018fb00",
});

export const auth = app.auth();
export default app;
