/* form.js */

// アンケート
document.addEventListener("DOMContentLoaded", function () {
    const whichCourseURL = {
        IT: [ "IA", "IS", "IR" ],
        DE: [ "DG", "DL", "DC" ],
        その他: [ "共通" ]
    };

    const whichClassURL = {
        IA: [],
        IS: [ "確率統計論B", "プログラミング概論B", "IoTシステム開発 Ⅰ A", "センサ・アクチュエータA", "センサ・アクチュエータB", "制御工学基礎A", "データベース基礎と応用B" ],
        IR: [],
        DG: [],
        DL: [],
        DC: [],
        共通: [ "英語B", "英語C", "英語E", "英語F", "英語G" ]
    }

    const whichCourse = {
        IT: [ "IA", "IS", "IR" ],
        DE: [ "DG", "DL", "DC" ]
    };

    const whichClass = {
        IA: [ "A", "B" ],
        IS: [ "A", "B" ],
        IR: [ "A" ],
        DG: [ "A" ],
        DL: [ "A" ],
        DC: [ "A", "B" ]
    };

    // 出席 URL
    function updateCoursesURL(selectedDepartment) {
        const courseContainer = document.getElementById("course-url");
        courseContainer.innerHTML = "";

        whichCourseURL[selectedDepartment].forEach((course, index) => {
            const div = document.createElement("div");
            div.classList.add("form-check", "form-check-inline");

            const input = document.createElement("input");
            input.classList.add("form-check-input");
            input.type = "radio";
            input.name = "course-url";
            input.id = "course" + course + "url";
            input.value = course;

            if (index === 0) {
                input.checked = true;
            }
            
            const label = document.createElement("label");
            label.classList.add("form-check-label");
            label.htmlFor = "course" + course + "url";
            label.textContent = course;

            div.appendChild(input);
            div.appendChild(label);
            courseContainer.appendChild(div);

            updateClassesURL(whichCourseURL[selectedDepartment][0]);

            document.querySelectorAll('input[name="course-url"]').forEach(radio => {
                radio.addEventListener("change", function () {
                    updateClassesURL(this.value);
                });
            });
        });
    }

    function updateClassesURL(selectedCourse) {
        const classContainer = document.getElementById("class-url");
        classContainer.innerHTML = "";

        whichClassURL[selectedCourse].forEach((className) => {
            const option = document.createElement("option");
            option.value = className;
            option.name = "class-url";
            option.textContent = className;

            classContainer.appendChild(option);
        });
    }

    // 科目調査アンケート
    function updateCourses(selectedDepartment) {
        const courseContainer = document.getElementById("course");
        courseContainer.innerHTML = "";

        whichCourse[selectedDepartment].forEach((course, index) => {
            const div = document.createElement("div");
            div.classList.add("form-check", "form-check-inline");

            const input = document.createElement("input");
            input.classList.add("form-check-input");
            input.type = "radio";
            input.name = "course";
            input.id = "course" + course;
            input.value = course;

            if (index === 0) {
                input.checked = true;
            }
            
            const label = document.createElement("label");
            label.classList.add("form-check-label");
            label.htmlFor = "course" + course;
            label.textContent = course;

            div.appendChild(input);
            div.appendChild(label);
            courseContainer.appendChild(div);
        });

        updateClasses(whichCourse[selectedDepartment][0]);

        document.querySelectorAll('input[name="course"]').forEach(radio => {
            radio.addEventListener("change", function () {
                updateClasses(this.value);
            });
        });
    }

    function updateClasses(selectedCourse) {
        const classContainer = document.getElementById("class");
        classContainer.innerHTML = "";

        whichClass[selectedCourse].forEach((className, index) => {
            const div = document.createElement("div");
            div.classList.add("form-check", "form-check-inline");

            const input = document.createElement("input");
            input.classList.add("form-check-input");
            input.type = "radio";
            input.name = "class";
            input.id = "class" + className;
            input.value = className;

            if (index === 0) {
                input.checked = true;
            }
            
            const label = document.createElement("label");
            label.classList.add("form-check-label");
            label.htmlFor = "class" + className;
            label.textContent = className;

            div.appendChild(input);
            div.appendChild(label);
            classContainer.appendChild(div);
        });
    }

    updateCoursesURL(document.querySelector('input[name="department-url"]:checked').value);
    document.querySelectorAll('input[name="department-url"]').forEach(radio => {
        radio.addEventListener("change", function () {
            updateCoursesURL(this.value);
        });
    });

    updateCourses(document.querySelector('input[name="department"]:checked').value);
    document.querySelectorAll('input[name="department"]').forEach(radio => {
        radio.addEventListener("change", function () {
            updateCourses(this.value);
        });
    });
});

// firebace
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

document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const department = document.querySelector('input[name="department-url"]:checked').value;
    const course = document.querySelector('input[name="course-url"]:checked').value;
    const classUrl = document.getElementById('class-url').value;
    const url = document.getElementById('url').value;
  
    try {
        await addDoc(collection(db, "出席URL入力"), {
            a_学科: department,
            b_コース: course,
            c_授業: classUrl,
            d_URL: url,
            e_タイムスタンプ: new Date()
        });
        alert('出席URL が送信されました！');
        document.getElementById('urlForm').reset();
    } catch (e) {
        console.error("エラー: ", e);
    }
});

document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const department = document.querySelector('input[name="department"]:checked').value;
    const course = document.querySelector('input[name="course"]:checked').value;
    const className = document.querySelector('input[name="class"]:checked').value;
    const english = document.querySelector('input[name="english"]:checked').value;
    const internship = document.querySelector('input[name="internship"]:checked').value;
    const permission = Array.from(document.querySelectorAll('input[name="hope"]:checked')).map(checkbox => checkbox.value);
  
    try {
        await addDoc(collection(db, "科目調査アンケート"), {
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
        await addDoc(collection(db, "リクエストフォーム"), {
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