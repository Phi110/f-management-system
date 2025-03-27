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
  
    const department = document.querySelector('input[name="department"]:checked').value;
    const course = document.querySelector('input[name="course"]:checked').value;
    const className = document.querySelector('input[name="class"]:checked').value;
    const english = document.querySelector('input[name="english"]:checked').value;
    const internship = document.querySelector('input[name="internship"]:checked').value;
    const permission = Array.from(document.querySelectorAll('input[name="hope"]:checked')).map(checkbox => checkbox.value);
  
    try {
        await addDoc(collection(db, "surveys"), {
            a_学科: department,
            b_コース: course,
            c_クラス: className,
            d_英語: english,
            e_実習: internship,
            f_承認: permission,
            g_タイムスタンプ: new Date()
        });
        alert('科目調査アンケート が送信されました！');
        document.getElementById('surveyForm').reset();
    } catch (e) {
        console.error("エラー: ", e);
    }
});

document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    /* const number = document.getElementById('number').value;
    const name = document.getElementById('name').value; */
    const feedback = document.getElementById('feedback').value;
  
    try {
        await addDoc(collection(db, "requests"), {
            コメント: feedback,
            /* number: number,
            name: name, */
            タイムスタンプ: new Date()
        });
        alert('リクエスト が送信されました！');
        document.getElementById('requestForm').reset();
    } catch (e) {
        console.error("エラー: ", e);
    }
});