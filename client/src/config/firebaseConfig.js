import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAy7BuwZg5osnug1sM104vr-tuY9QCb0pw",
  authDomain: "fasecam-44231.firebaseapp.com",
  databaseURL:
    "https://fasecam-44231-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fasecam-44231",
  storageBucket: "fasecam-44231.appspot.com",
  messagingSenderId: "603911072055",
  appId: "1:603911072055:web:c558f42d529e5d1bb912b2",
};

const firebaseApp = initializeApp(firebaseConfig);
const databaseApp = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
export { auth };
export default databaseApp;
