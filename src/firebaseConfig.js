import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFT4L2Y8S1z5S3_5r5nCH0b-Z7ZA7fyFs",
    authDomain: "blog-f1-pilotos.firebaseapp.com",
    projectId: "blog-f1-pilotos",
    storageBucket: "blog-f1-pilotos.firebasestorage.app",
    messagingSenderId: "888296146996",
    appId: "1:888296146996:web:6e2a90216fc4dfd83ca261",
    measurementId: "G-PH2W6GQDYF"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);