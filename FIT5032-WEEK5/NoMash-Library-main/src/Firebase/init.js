// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtONSVaZViZg4QRUuLn_fs-_m-eF8f2mY',
  authDomain: 'week7-blake.firebaseapp.com',
  projectId: 'week7-blake',
  storageBucket: 'week7-blake.firebasestorage.app',
  messagingSenderId: '912323356501',
  appId: '1:912323356501:web:4a774c103c4201de0071dc'
}

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db
