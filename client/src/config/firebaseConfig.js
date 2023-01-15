import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8UyAVJ9GlHwav0UIcjYzKKpUHQFJVqa0",
  authDomain: "attendancemanagement-7bf42.firebaseapp.com",
  databaseURL:
    "https://attendancemanagement-7bf42-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attendancemanagement-7bf42",
  storageBucket: "attendancemanagement-7bf42.appspot.com",
  messagingSenderId: "492048061748",
  appId: "1:492048061748:web:b35a043c87ad39ba1b0161",
  measurementId: "G-ZCE5PQ6V10",
};

const firebaseApp = initializeApp(firebaseConfig);
const databaseApp = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export { storage };
export { auth };
export default databaseApp;
