const firebaseConfig = {
    apiKey: "AIzaSyCo3wV-0UysTzhSJuahnXxI29I4XryhYUI",
    authDomain: "f-management-system.firebaseapp.com",
    projectId: "f-management-system",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const userInfo = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout");
const loginBtn = document.getElementById("login");

let userId = null;
let selectedIds = new Set();

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = () => {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("ログイン成功", result.user);
    })
    .catch(error => {
      console.error("ログイン失敗", error);
    });
};

logoutBtn.onclick = () => {
  auth.signOut();
};

auth.onAuthStateChanged(async user => {
    if (user) {
        userInfo.textContent = `ログイン中: ${user.displayName} (${user.email})`;
        logoutBtn.style.display = "inline";
        loginBtn.style.display = "none";

        userId = user.uid;
        const doc = await db.collection("users").doc(userId).get();
        const saved = doc.data()?.selectedCells || [];
        selectedIds = new Set(saved);
    
        document.querySelectorAll('input[type="checkbox"]').forEach(box => {
            const id = box.dataset.id;
            box.checked = selectedIds.has(id);
        });
    } else {
        userInfo.textContent = "ログインしていません。";
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline";
    }

    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        const id = box.dataset.id;
        box.addEventListener("change", () => {
            if (!userId) {
                alert("先にログインしてください");
                box.checked = false;
                return;
            }
        
            if (box.checked) {
                selectedIds.add(id);
            } else {
                selectedIds.delete(id);
            }
        
            db.collection("users").doc(userId).set({
                selectedCells: [...selectedIds]
            });
        });
    });
});