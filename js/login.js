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

const updateRowAppearance = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        const id = box.dataset.id;
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            if (box.checked) {
                row.classList.add('grayed-out');
            } else {
                row.classList.remove('grayed-out');
            }
        }
    });
};

function checkAllTasksCompleted() {
    const allChecked = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .every(box => box.checked);
  
    const congratsMessage = document.getElementById('congratulations-message');
  
    if (allChecked) {
      congratsMessage.classList.add('visible');
      congratsMessage.classList.remove('hidden');
    } else {
      congratsMessage.classList.add('hidden');
      congratsMessage.classList.remove('visible');
    }
}

function setAutoOpenTimer() {
    const scheduleByDay = {
        1: [
            { time: "13:15", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78892" },
            { time: "14:55", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79268" },
            { time: "16:35", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79314" }
        ],
        2: [
            { time: "14:55", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79076" },
            { time: "16:35", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79076" },
        ],
        3: [
            { time: "9:10", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78899" }
        ],
        4: [
            { time: "9:10", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79662" },
            { time: "10:50", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78895" }
        ],
        5: [
            { time: "13:15", url: "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79755" }
        ]
    };
    
    const today = new Date().getDay();
    const todaySchedule = scheduleByDay[today] || [];
    
    for (const item of todaySchedule) {
        const [hour, minute] = item.time.split(":").map(Number);
    
        const now = new Date();
        const openTime = new Date();
        openTime.setHours(hour, minute, 0, 0);
    
        let delay = openTime.getTime() - now.getTime();
        if (delay < 0) {
            continue;
        }
    
        setTimeout(() => {
            window.open(item.url, "_blank");
        }, delay);
    }
}

auth.onAuthStateChanged(async user => {
    if (user) {
        userId = user.uid;
        const doc = await db.collection("users").doc(userId).get();
        const data = doc.data() || {};

        const autoOpen = data.autoOpen !== undefined ? data.autoOpen : true;

        userInfo.innerHTML = `
            <h4 class="bottom-space">ログイン中: ${user.displayName} (${user.email})</h3>
            <label class="top-space bottom-space" for="auto-open-yes">5 分前に自動で出席 URL を開く</label>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="auto-open" id="auto-open-yes" value="はい" ${autoOpen ? "checked" : ""}>
                <label class="form-check-label" for="auto-open-yes">はい</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="auto-open" id="auto-open-no" value="いいえ" ${!autoOpen ? "checked" : ""}>
                <label class="form-check-label" for="auto-open-no">いいえ</label>
            </div>
        `;

        logoutBtn.style.display = "inline";
        loginBtn.style.display = "none";

        if (data.autoOpen) {
            setAutoOpenTimer();
        }

        selectedIds = new Set(data.selectedCells || []);
    
        document.querySelectorAll('input[type="checkbox"]').forEach(box => {
            const id = box.dataset.id;
            box.checked = selectedIds.has(id);
        });

        updateRowAppearance();
        checkAllTasksCompleted();
    } else {
        userInfo.textContent = "ログインしていません。";
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline";
    }

    // 自動出席URL
    const autoOpenRadios = document.querySelectorAll('input[name="auto-open"]');

    autoOpenRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (userId) {
                const selectedValue = document.querySelector('input[name="auto-open"]:checked').value;
                db.collection('users').doc(userId).set({
                    autoOpen: selectedValue === "はい"
                }, { merge: true });
            }
        });
    });

    // チェックボックス
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

            updateRowAppearance();

            const allChecked = Array.from(document.querySelectorAll('input[type="checkbox"]'))
                .every(box => box.checked);

            const congratsMessage = document.getElementById('congratulations-message');

            if (allChecked) {
                congratsMessage.classList.add('visible');
                congratsMessage.classList.remove('hidden');

                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                congratsMessage.classList.add('hidden');
                congratsMessage.classList.remove('visible');
            }
        });
    });

    // フォーム
    document.getElementById('urlForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        if (!userId) {
            alert("先にログインしてください");
            return;
        }
      
        const department = document.querySelector('input[name="department-url"]:checked').value;
        const course = document.querySelector('input[name="course-url"]:checked').value;
        const classUrl = document.getElementById('class-url').value;
        const url = document.getElementById('url').value;
      
        try {
            await db.collection("出席URL入力").add({
                a_学科: department,
                b_コース: course,
                c_授業: classUrl,
                d_URL: url,
                e_タイムスタンプ: new Date()
            });
            alert('出席URL入力 が送信されました！');
            document.getElementById('urlForm').reset();
        } catch (e) {
            console.error("エラー: ", e);
        }
    });
    
    document.getElementById('surveyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        if (!userId) {
            alert("先にログインしてください");
            return;
        }
      
        const department = document.querySelector('input[name="department"]:checked').value;
        const course = document.querySelector('input[name="course"]:checked').value;
        const className = document.querySelector('input[name="class"]:checked').value;
        const english = document.querySelector('input[name="english"]:checked').value;
        const internship = document.querySelector('input[name="internship"]:checked').value;
      
        try {
            await db.collection("科目調査アンケート").add({
                a_学科: department,
                b_コース: course,
                c_クラス: className,
                d_英語: english,
                e_実習: internship,
                f_タイムスタンプ: new Date()
            });
            alert('科目調査アンケート が送信されました！');
            document.getElementById('surveyForm').reset();
        } catch (e) {
            console.error("エラー: ", e);
        }
    });
    
    document.getElementById('requestForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        if (!userId) {
            alert("先にログインしてください");
            return;
        }
      
        const feedback = document.getElementById('feedback').value;
      
        try {
            await db.collection("リクエストフォーム").add({
                コメント: feedback,
                タイムスタンプ: new Date()
            });
            alert('リクエストフォーム が送信されました！');
            document.getElementById('requestForm').reset();
        } catch (e) {
            console.error("エラー: ", e);
        }
    });
});