import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCA0xyzDy7JmaQEINTvqmXfVzfAh1cNyk0",
  authDomain: "exam0829-3c850.firebaseapp.com",
  projectId: "exam0829-3c850",
  storageBucket: "exam0829-3c850.firebasestorage.app",
  messagingSenderId: "617125485040",
  appId: "1:617125485040:web:434b11e219543789882535",
  measurementId: "G-8TLDDWCC7V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { collection, addDoc, getDocs, deleteDoc, doc };
