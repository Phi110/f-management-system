/* fms.js */


/*  */
// 現在時  // リロード  // 今週の自習・談話室
import { toClock, reloadPage, toStudyroom, addHighlight } from './module/module.js';


const whattime = document.getElementById('whattime');
whattime.innerHTML = toClock(true);  // addSaturday


reloadPage();


const studyroom = document.getElementById(`studyroom`);
toStudyroom(studyroom);
const highlight = document.getElementById(`highlight`);
addHighlight(highlight);


// イメージマップ
window.addEventListener('load', function() {
    imageMapResize();
});
document.addEventListener("shown.bs.modal", (event) => {
    if (["modalIA2", "modalIS2", "modalDG2", "modalDC2", "modalEnglish"].includes(event.target.id)) {
        imageMapResize();
    }
});



/* CSV */
// 更新日  // 課題  // イベント  // テスト  // お知らせ  // アラート // 出席 // 時間割
import { Version, Assignment, Event, Test, Notification, Alert, Attendance, Curriculum } from "./module/module.js";


document.addEventListener('DOMContentLoaded', function() {
    const fmsParsers = [
        { file: "version", Class: Version },
        { file: "assignment", Class: Assignment },
        { file: "event", Class: Event },
        { file: "test", Class: Test },
        { file: "notification", Class: Notification },
        { file: "alert", Class: Alert }
    ];

    fmsParsers.forEach(({ file, Class }) => {
        fetch(`./csv/${file}.csv`)
            .then(response => response.text())
            .then(data => parseCSV(data, Class, file));
    });

    const curriculums = ["IT", "IA2", "IS2", "DE", "DG2", "DC2", "English"];

    Promise.all(
        curriculums.map(csv =>
            fetch(`./csv/curriculum/${csv}.csv`).then(response => response.text())
        )
    )
    .then(([data1, data2, data3, data4, data5, data6, data7]) => {
        parseAttendanceCSV([data1, data2, data3, data4, data5, data6, data7]);
        parseCurriculumCSV([data2, data3, data5, data6, data7]);
    });
});

function parseCSV(data, Class, file) {
    const obj = new Class(data);
    obj.processing();
    const target = document.getElementById(file);
    target.innerHTML = obj.paragraph;
}

function parseAttendanceCSV(data) {
    const a = new Attendance();
    for (const csv of data) {
        a.add(csv);
    }
    a.processing();
    for (let i = 0; i < a.cardList.length; i++) {
        let card = document.getElementById(`card${i}`);
        card.innerHTML = a.cardList[i];
    }
}

function parseCurriculumCSV(data) {
    const c = new Curriculum();
    for (const csv of data) {
        c.add(csv);
    }
    c.toModal();
    let modalCurriculum = document.getElementById(`modal-curriculum`);
    modalCurriculum.innerHTML += c.modal;
}
