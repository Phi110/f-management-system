/* login.js */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
const auth = getAuth(app);

// 新規登録
document.getElementById("register").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("登録完了: " + userCredential.user.email);
        })
        .catch(error => {
            alert("エラー: " + error.message);
        });
});

// ログイン
document.getElementById("login").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("ログイン成功: " + userCredential.user.email);
        })
        .catch(error => {
            alert("ログイン失敗: " + error.message);
        });
});



// ログアウト
/* document.getElementById("logout").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("ログアウトしました");
        })
        .catch(error => {
            alert("エラー: " + error.message);
        });
}); */