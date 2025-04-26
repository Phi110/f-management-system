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
        共通: [ "英語B", "英語E", "英語F", "英語G" ]
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