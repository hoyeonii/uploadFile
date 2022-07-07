// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9wutcQWswTwY8zH1F3mr-qOmLO2rlU4A",
  authDomain: "fileupload-909fd.firebaseapp.com",
  projectId: "fileupload-909fd",
  storageBucket: "fileupload-909fd.appspot.com",
  messagingSenderId: "813697442358",
  appId: "1:813697442358:web:5229683340c464c0d4ae97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
