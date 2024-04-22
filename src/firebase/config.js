import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAf45W5HydEAsuW4Tmd9g7KSGBO2XPdgwM",
  authDomain: "job-seeker-d56c3.firebaseapp.com",
  projectId: "job-seeker-d56c3",
  storageBucket: "job-seeker-d56c3.appspot.com",
  messagingSenderId: "729872060795",
  appId: "1:729872060795:web:4f3a9f7d872cf315a5adde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//services
export const auth = getAuth();
export const db = getFirestore();