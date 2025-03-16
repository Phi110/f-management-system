/* form.js */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCo3wV-0UysTzhSJuahnXxI29I4XryhYUI",
    authDomain: "f-management-system.firebaseapp.com",
    projectId: "f-management-system",
    storageBucket: "f-management-system.firebasestorage.app",
    messagingSenderId: "674332684290",
    appId: "1:674332684290:web:19665cd604658ed565b71b",
    measurementId: "G-90MFZR06SG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
  
    try {
        await addDoc(collection(db, "surveys"), {
            feedback: feedback,
            number: number,
            name: name,
            timestamp: new Date()
        });
        alert('意見・要望が送信されました！');
        document.getElementById('surveyForm').reset();
    } catch (e) {
        console.error("エラー: ", e);
    }
});