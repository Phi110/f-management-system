/* fms.js */



/*  */
// 現在時  // リロード  // 今週の自習・談話室  // 実習モーダル
import { toClock, reloadPage, toStudyroom, toPracticalModal } from '../module/module.js';


// document.body.style.backgroundColor = '#ffcccc';
document.body.style.backgroundColor = '#feffce';


const whattime = document.getElementById('whattime');
whattime.innerHTML = toClock(true);  // addSaturday


reloadPage();


const studyroom = document.getElementById(`studyroom`);
studyroom.src = toStudyroom();


const modalPracticeDescribe = document.getElementById(`modalPracticeDescribe`);
modalPracticeDescribe.innerHTML = toPracticalModal();


// イメージマップ
window.addEventListener('load', function() {
    imageMapResize();
});
const modalAI = document.getElementById('modalAI');
modalAI.addEventListener('shown.bs.modal', function () {
    imageMapResize();
});



/* CSV */
// 更新日  // 課題  // イベント  // お知らせ  // アラート // 出席
import { Version, Assignment, Event, Notification, Alert, Attendance } from "../module/module.js";


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

    fetch('./csv/notification.csv')
    .then(response => response.text())
    .then(data => parseNotificationCSV(data));

    fetch('./csv/alert.csv')
    .then(response => response.text())
    .then(data => parseAlertCSV(data));

    fetch('./csv/attendance.csv')
    .then(response => response.text())
    .then(data => parseAttendanceCSV(data));
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
    const a = new Attendance(data);
    a.processing();
    for (let i = 0; i < a.cardList.length; i++) {
        let card = document.getElementById(`card${i}`);
        card.innerHTML = a.cardList[i];
    }
}
