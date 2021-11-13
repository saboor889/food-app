import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth   , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut } from "firebase/auth";
import {getFirestore, collection, addDoc ,doc ,setDoc , getDoc , getDocs ,deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes ,getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAARdch-ANZHWXNe_JoiZ-egsUORLs6LsU",
  authDomain: "testing-9c889.firebaseapp.com",
  projectId: "testing-9c889",
  storageBucket: "testing-9c889.appspot.com",
  messagingSenderId: "729086942019",
  appId: "1:729086942019:web:bcf57b8cf4aee835642df6",
  measurementId: "G-H0BDMCC926"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteDoc
}