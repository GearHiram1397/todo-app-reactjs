// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyChBHdkCzC67kNmztjCHE7I6qGFNtwdBdo",
  authDomain: "todo-app-b8b13.firebaseapp.com",
  projectId: "todo-app-b8b13",
  storageBucket: "todo-app-b8b13.appspot.com",
  messagingSenderId: "940155190654",
  appId: "1:940155190654:web:9ee7b8f43b2ff97eab872f"
});




// Initialize Firebase
const db = getFirestore(firebaseApp)
export {db}