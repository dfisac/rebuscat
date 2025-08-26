// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgRaJvHnd63uszj6VH8cSGMHTj0jUSPz0",
  authDomain: "rebuscat-1607f.firebaseapp.com",
  projectId: "rebuscat-1607f",
  storageBucket: "rebuscat-1607f.firebasestorage.app",
  messagingSenderId: "68150878163",
  appId: "1:68150878163:web:fe4514fd30cf5eb36a9926",
  measurementId: "G-QLNHNPGP3Y"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
