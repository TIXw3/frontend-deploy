import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTtJl9zL4mfzlq8nH36QoE__eS_kGF6Cw",
  authDomain: "tixupnotifications.firebaseapp.com",
  projectId: "tixupnotifications",
  storageBucket: "tixupnotifications.firebasestorage.app",
  messagingSenderId: "131618596059",
  appId: "1:131618596059:web:b7b142cc3d7b6ce348d8fe",
  measurementId: "G-SZB7GH31NM",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
