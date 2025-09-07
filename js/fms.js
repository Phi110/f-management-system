/* fms.js */


/*  */
// 現在時  // リロード  // 今週の自習・談話室
import { toClock, reloadPage, toStudyroom } from './module/module.js';


const whattime = document.getElementById('whattime');
whattime.innerHTML = toClock(true);  // addSaturday


reloadPage();


const studyroom = document.getElementById(`studyroom`);
studyroom.src = toStudyroom();



// イメージマップ
window.addEventListener('load', function() {
    imageMapResize();
});
const modalAI = document.getElementById('modalAI');
modalAI.addEventListener('shown.bs.modal', function () {
    imageMapResize();
});



/* CSV */
// 更新日  // 課題  // イベント  // テスト  // お知らせ  // アラート // 出席 // 時間割
import { Version, Assignment, Event, Test, Notification, Alert, Attendance, Curriculum } from "./module/module.js";


document.addEventListener('DOMContentLoaded', function() {
    fetch('./csv/version.csv')
    .then(response => response.text())
    .then(data => parseVersionCSV(data));

    fetch('./csv/assignment.csv')
    .then(response => response.text())
    .then(data => parseAssignmentCSV(data));

    fetch('./csv/event.csv')
    .then(response => response.text())
    .then(data => parseEventCSV(data));

    fetch('./csv/test.csv')
    .then(response => response.text())
    .then(data => parseTestCSV(data));

    fetch('./csv/notification.csv')
    .then(response => response.text())
    .then(data => parseNotificationCSV(data));

    fetch('./csv/alert.csv')
    .then(response => response.text())
    .then(data => parseAlertCSV(data));

    Promise.all([
        fetch(`./csv/curriculum/common.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/IT.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/IA2.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/IS2.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/DE.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/DG2.csv`).then(response => response.text()),
        fetch(`./csv/curriculum/DC2.csv`).then(response => response.text()),
    ])
    .then(([data1, data2, data3, data4, data5, data6, data7]) => {
        parseAttendanceCSV([data1, data2, data3, data4, data5, data6, data7]);
    });
});

function parseVersionCSV(data) {
    const v = new Version(data);
    v.processing();
    const version = document.getElementById('version');
    version.innerHTML = v.paragraph;
}

function parseAssignmentCSV(data) {
    const a = new Assignment(data);
    a.processing();
    let assignmentTable = document.getElementById(`assignment-table`);
    assignmentTable.innerHTML = a.paragraph;
}

function parseEventCSV(data) {
    const e = new Event(data);
    e.processing();
    let eventTable = document.getElementById(`event-table`);
    eventTable.innerHTML = e.paragraph;
}

function parseTestCSV(data) {
    const t = new Test(data);
    t.processing();
    let testTable = document.getElementById(`test-table`);
    testTable.innerHTML = t.paragraph;
}

function parseNotificationCSV(data) {
    const n = new Notification(data);
    n.processing();
    let notification = document.getElementById(`notification`);
    notification.innerHTML = n.paragraph;
}

function parseAlertCSV(data) {
    const a = new Alert(data);
    a.processing();
    let alert = document.getElementById(`alert`);
    alert.innerHTML += a.paragraph;
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
