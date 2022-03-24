import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDFnVcWPxPTTQNPYUQB4m-qlWe1CNJLFxg",
    authDomain: "whatsappclone-1eaf8.firebaseapp.com",
    projectId: "whatsappclone-1eaf8",
    storageBucket: "whatsappclone-1eaf8.appspot.com",
    messagingSenderId: "598731190480",
    appId: "1:598731190480:web:6e68319375ed47d8cc6ed5",
    measurementId: "G-TF5NB2BNMV"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app)

  const provider = new GoogleAuthProvider()
  

  export {auth, provider}