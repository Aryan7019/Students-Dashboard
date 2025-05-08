import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9bnL-KxuHj1KkvEKhsETq1x2JLpHxQQg",
  authDomain: "studentdashboard-7bf89.firebaseapp.com",
  projectId: "studentdashboard-7bf89",
  storageBucket: "studentdashboard-7bf89.appspot.com",
  messagingSenderId: "543015160888",
  appId: "1:543015160888:web:181023514d049b62146acd",
  measurementId: "G-RV8FTY3YQQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);