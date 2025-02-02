// fms.js

const currentTime = new Date();
const year = currentTime.getFullYear();
const month = currentTime.getMonth();
const date = currentTime.getDate();
const day = currentTime.getDay();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
let period = "--";


/* 現在時 */
if ((day==6 || day==0)) {
} else if ((hour==9 && minute>5) || (hour==10 && minute<=45)) {
    period = 1;
} else if ((hour==10 && minute>45) || (hour==11) || (hour==12 && minute<=25)) {
    period = 2;
} else if ((hour==13 && minute>10) || (hour==14 && minute<=50)) {
    period = 3;
} else if ((hour==14 && minute>50) || (hour==15) || (hour==16 && minute<=30)) {
    period = 4;
} else if ((hour==16 && minute>30) || (hour==18 && minute<=10)) {
    period = 5;
} else if ((hour==18 && minute>10) || (hour==19 && minute<=50)) {
    period = 6;
} /*else if ((hour==19 && minute>50) || (hour==20) || (hour==21 && minute<=30)) {
    period = 7;
}*/

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
    <span class="emphasize">${li[3]}</span> ${period}限
</h2>`


/* 出席 */
const urlContainer0 = document.getElementById('url-container0');
const urlContainer1 = document.getElementById('url-container1');
const urlContainer2 = document.getElementById('url-container2');
const urlContainer3 = document.getElementById('url-container3');

if (day == 3) {
    if (period==3) {
        urlContainer0.src = "images/attendance1.webp";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72622" target="_blank">コミュニケーションツールD（2024_火曜2限_IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_学部共)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">13:20 - 14:50</small></p>';
    }
}

if (day == 5) {
    if (1<=period && period<=4) {
        urlContainer0.src = "images/attendance2.webp";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=73031" target="_blank">組込みC, C++言語B（2024_月曜1・2限_IT1B/IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_共_IT)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">9:15 - 16:30</small></p>';
    }
}

/* 自動採点 */
function checkAnswers(th, start, end) {
    let correctCount = 0;
    let totalCount = 0;
    for (let i = start; i <= end; i++) {
        let result = document.getElementById("result" + String(i));
        if (document.getElementById("answer" + String(i)).value == "1") {
            result.innerHTML = '<i class="bi bi-check-lg text-success right-space"></i>';
            correctCount++;
        } else {
            result.innerHTML = '<i class="bi bi-x-lg text-danger right-space"></i>';
        }
        totalCount++;
    }

    let markis, word;
    let correctRate = Math.floor(100*(correctCount / totalCount));
    if (correctRate == 100) {
        markis = '<i class="bi bi-circle text-success right-space"></i>';
        word = '<span class="text-success">Perfect</span>';
    } else if (correctRate >= 50) {
        markis = '<i class="bi bi-triangle text-primary right-space"></i>';
        word = '<span class="text-primary">Good</span>';
    } else {
        markis = '<i class="bi bi-x-lg text-danger right-space"></i>';
        word = '<span class="text-danger"></span>';
    }

    let score = document.getElementById("score" + String(th));
    score.innerHTML = `<p>${markis}<strong>${correctCount}問</strong> / ${totalCount}問 (${correctRate}%) 正解です ${word}</p>`;
}

function checkAnswers2() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    let outcome = document.getElementById("outcome");
    if (selected.value == "1") {
        outcome.innerHTML = '<i class="bi bi-circle text-success left-space"></i>';
    } else {
        outcome.innerHTML = '<i class="bi bi-x-lg text-danger left-space"></i>';
    }
}
