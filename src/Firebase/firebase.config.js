// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHMjONOaMwVt1VnOyQG9hJjiUKgwwzYQs",
  authDomain: "homehive-72a2c.firebaseapp.com",
  projectId: "homehive-72a2c",
  storageBucket: "homehive-72a2c.firebasestorage.app",
  messagingSenderId: "326524807105",
  appId: "1:326524807105:web:46e3e5a1eb3c4895997140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;