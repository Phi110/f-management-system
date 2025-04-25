/* fms.js */

// イメージマップ
window.addEventListener('load', function() {
    imageMapResize();
});
const modalAI = document.getElementById('modalAI');
const modalIoT = document.getElementById('modalIoT');
const modalCG = document.getElementById('modalCG');
modalAI.addEventListener('shown.bs.modal', function () {
    imageMapResize();
});
modalIoT.addEventListener('shown.bs.modal', function () {
    imageMapResize();
});
modalCG.addEventListener('shown.bs.modal', function () {
    imageMapResize();
});

// 現在時
const currentTime = new Date();
const year = currentTime.getFullYear();
const month = currentTime.getMonth();
const date = currentTime.getDate();
const day = currentTime.getDay();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
let period = "";

if ((day==0 || day==6)) {
} else if ((hour==9 && minute>=5) || (hour==10 && minute<45)) {
    period = 1;
} else if ((hour==10 && minute>=45) || (hour==11) || (hour==12 && minute<25)) {
    period = 2;
} else if ((hour==12 && minute>=25) || (hour==13) || (hour==14 && minute<50)) {
    period = 3;
} else if ((hour==14 && minute>=50) || (hour==15) || (hour==16 && minute<30)) {
    period = 4;
} else if ((hour==16 && minute>=30) || (hour==17) || (hour==18 && minute<10)) {
    period = 5;
} else if ((hour==18 && minute>=10) || (hour==19 && minute<50)) {
    period = 6;
} /*else if ((hour==19 && minute>50) || (hour==20) || (hour==21 && minute<=30)) {
    period = 7;
} */

let whatperiod = period;
if (typeof(period) != 'string') {
    whatperiod = `(${period}限)`;
}

let li = [month+1, date, hour, minute];
for (let i = 0; i < li.length; i++) {
    let element = String(li[i])
    if (element.length < 2) {
        li[i] = "0" + element;
    }
}

let wday = ["日", "月", "火", "水", "木", "金", "土"];
const whattime = document.getElementById('whattime');
whattime.innerHTML = `<h2>
    <span class="emphasize">${li[0]}</span> /
    <span class="emphasize">${li[1]}</span> 
    <span class="right-space">(${wday[day]})</span> 
    <span class="emphasize">${li[2]}</span> : 
    <span class="emphasize">${li[3]}</span> ${whatperiod}
</h2>`;


if (month == 3 && date == 24) {
    document.body.style.backgroundColor = '#ffcccc';
} else {
    document.body.style.backgroundColor = '#feffce';
}


// リロード
function reloadPage(hour, minute, second) {
    const target = new Date();
    target.setHours(hour, minute, second, 0);

    if (currentTime > target) {
        target.setDate(target.getDate() + 1);
    }

    const timeUntilReload = target - currentTime;

    setTimeout(() => {
        location.reload();
    }, timeUntilReload);
}

reloadPage(9, 5, 0);
reloadPage(10, 45, 0);
reloadPage(13, 10, 0);
reloadPage(14, 50, 0);
reloadPage(16, 30, 0);
reloadPage(18, 10, 0);
/* reloadPage(19, 50, 0); */


// 今週の自習・談話室
function getWeekNumber() {
    const firstDay = new Date(year, month, 1);
    const gap = (8 - firstDay.getDay()) % 7;
    const firstMonday = (new Date(year, month, 1 + gap)).getDate();

    if (date < firstMonday) return 0;

    const weekNumber = 1 + Math.floor((date - firstMonday) / 7);
    return weekNumber;
}

let studyroom = document.getElementById(`studyroom`);
studyroom.src = "images/studyroom/studyroom" + (month+1) + "." + getWeekNumber() + ".webp";


let internshipModalDescribe = document.getElementById(`internshipModalDescribe`);
if (day == 3) {
    internshipModalDescribe.innerHTML = `<img src="images/internship/wednesday.webp" class="img-fluid">`;
} else if (day == 4) {
    internshipModalDescribe.innerHTML = `<img src="images/internship/thursday.webp" class="img-fluid">`;
}