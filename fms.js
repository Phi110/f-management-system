/* current time */

/* attendance */
const urlContainer0 = document.getElementById('url-container0');
const urlContainer1 = document.getElementById('url-container1');
const urlContainer2 = document.getElementById('url-container2');
const urlContainer3 = document.getElementById('url-container3');
const currentTime = new Date();
const day = currentTime.getDay();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
    
/* 水曜日 */
if (day == 3) {
    /* 3限 13:10 - 14:50 */
    if (hour == 13 && 10 <= minute && minute <= 50) {
        urlContainer0.src = "images/attendance1.webp";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72622" target="_blank">コミュニケーションツールD（2024_火曜2限_IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_学部共)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">13:20 - 14:50</small></p>';
    }
}

/* 金曜日 */
if (day == 5) {
    /* 1限 9:05 - 4限 16:30 */
    if ((hour == 9 && minute >= 5) || (10 <= hour && hour <= 15) || (hour == 16 && minute <= 30)) {
        urlContainer0.src = "images/attendance2.webp";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=73031" target="_blank">組込みC, C++言語B（2024_月曜1・2限_IT1B/IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_共_IT)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">9:15 - 16:30</small></p>';
    }
}

/* checkanswers */
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
    let answerRate = correctCount / totalCount;
    if (answerRate == 1) {
        markis = '<i class="bi bi-circle text-success right-space"></i>';
        word = '<span class="text-success">Perfect</span>';
    } else if (answerRate >= 0.5) {
        markis = '<i class="bi bi-triangle text-primary right-space"></i>';
        word = '<span class="text-primary">Good</span>';
    } else {
        markis = '<i class="bi bi-x-lg text-danger right-space"></i>';
        word = '<span class="text-danger">Oh...</span>';
    }

    let score = document.getElementById("score" + String(th));
    score.innerHTML = `<p>${markis}<strong>${correctCount}問</strong> / ${totalCount}問 正解です ${word}</p>`;
}