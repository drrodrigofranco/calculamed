import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Configuração REAL do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyDPdXwxmXYCzAvvLo5PFP5u5d5H8fa_VCU",
  authDomain: "ajuda-saude-e0fd7.firebaseapp.com",
  projectId: "ajuda-saude-e0fd7",
  storageBucket: "ajuda-saude-e0fd7.firebasestorage.app",
  messagingSenderId: "1017402938498",
  appId: "1:1017402938498:web:8e624d488c6a31f8e2909b",
  measurementId: "G-MT8C99RP7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, 'southamerica-east1'); // Região configurada na extensão
const googleProvider = new GoogleAuthProvider();

export { auth, db, functions, googleProvider };