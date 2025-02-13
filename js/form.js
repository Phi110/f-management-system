/* form.js */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo3wV-0UysTzhSJuahnXxI29I4XryhYUI",
  authDomain: "f-management-system.firebaseapp.com",
  projectId: "f-management-system",
  storageBucket: "f-management-system.firebasestorage.app",
  messagingSenderId: "674332684290",
  appId: "1:674332684290:web:19665cd604658ed565b71b",
  measurementId: "G-90MFZR06SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function save_form() {
    const comment = document.getElementById('comment').value;

    if (!comment) {
        alert("コメントを入力してください");
        return;
    }

    try {
        await addDoc(collection(db, "comments"), {
            text: comment,
            timestamp: new Date()
        });
        alert("データが保存されました！");
    } catch (error) {
        console.error("エラー:", error);
    }
}