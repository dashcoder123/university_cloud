// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVugD24qOFhGIsr2GUi96QyuQ5UZxHjjQ",
    authDomain: "sndtportal.firebaseapp.com",
    projectId: "sndtportal",
    storageBucket: "sndtportal.firebasestorage.app",
    messagingSenderId: "351280772238",
    appId: "1:351280772238:web:c21d50b34f405d758685df",
    measurementId: "G-JZ4CN5LYCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// ✅ Export app so it can be used elsewhere
export { app };
