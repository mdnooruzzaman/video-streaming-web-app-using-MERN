// import firbase from "firebase"
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDLao6rz-12MQMAc9ITpGII4NoTpJoAuyU",
    authDomain: "neflix-cb931.firebaseapp.com",
    projectId: "neflix-cb931",
    storageBucket: "neflix-cb931.appspot.com",
    messagingSenderId: "23576235574",
    appId: "1:23576235574:web:e97353c58488c562665297",
    measurementId: "G-FW7M4ZJKRG"
  };

  export const app = initializeApp(firebaseConfig);

 export const storage = getStorage(app)

  