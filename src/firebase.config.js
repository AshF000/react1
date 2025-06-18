// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyP46YuU5msjbU3yx3KGMMmYf2M4Hggt4",
  authDomain: "react-1-todolist.firebaseapp.com",
  databaseURL: "https://react-1-todolist-default-rtdb.firebaseio.com",
  projectId: "react-1-todolist",
  storageBucket: "react-1-todolist.firebasestorage.app",
  messagingSenderId: "711945636453",
  appId: "1:711945636453:web:11fcce408272e53fab148c",
  measurementId: "G-KHFHHYLLCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;