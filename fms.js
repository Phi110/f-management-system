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
        urlContainer0.src = "https://pbs.twimg.com/media/GiZ60bvbkAA7k_T?format=jpg&name=small";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72622" target="_blank">コミュニケーションツールD（2024_火曜2限_IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_学部共)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">13:20 - 14:50</small></p>';
    }
}

/* 金曜日 */
if (day == 5) {
    /* 1限 9:05 - 4限 16:30 */
    if ((hour == 9 && minute >= 5) || (10 <= hour && hour <= 15) || (hour == 16 && minute <= 30)) {
        urlContainer0.src = "https://pbs.twimg.com/media/Gicsl-QbcAAMaVZ?format=jpg&name=small";
        urlContainer1.innerHTML = '<h5 class="card-title"><a href="https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=73031" target="_blank">組込みC, C++言語B（2024_月曜1・2限_IT1B/IT1D）</a></h5>';
        urlContainer2.innerHTML = '<p class="card-text">後期(24_共_IT)</p>';
        urlContainer3.innerHTML = '<p class="card-text"><small class="text-body-secondary">9:15 - 16:30</small></p>';
    }
}

/* checkanswers */
function checkAnswers1() {
    let correctAnswers = {
        answer1_1: "独自性・有期性",
        answer1_2: "新しい価値",
        answer1_3: "知識・スキル",
        answer1_4: "ツール・技法",
        answer1_5: "期限",
        answer1_6: "資源・予算",
        answer1_7: "目的・目標",
        answer1_8: "不確実性",
        answer1_9: "手法",
        answer2_1: "スコープ・スケジュール・コスト",
        answer2_2: "スコープ",
        answer2_3: "スケジュールとコスト"
    };

    let userAnswers = {
        answer1_1: document.getElementById("answer1_1").value,
        answer1_2: document.getElementById("answer1_2").value,
        answer1_3: document.getElementById("answer1_3").value,
        answer1_4: document.getElementById("answer1_4").value,
        answer1_5: document.getElementById("answer1_5").value,
        answer1_6: document.getElementById("answer1_6").value,
        answer1_7: document.getElementById("answer1_7").value,
        answer1_8: document.getElementById("answer1_8").value,
        answer1_9: document.getElementById("answer1_9").value,
        answer2_1: document.getElementById("answer2_1").value,
        answer2_2: document.getElementById("answer2_2").value,
        answer2_3: document.getElementById("answer2_3").value,
    };
    
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    for (let key in correctAnswers) {
        let result = document.getElementById("result" + key.slice(-3));
        if (correctAnswers[key] === userAnswers[key]) {
            result.innerHTML = " O "; 
            correctCount++;
        } else {
            result.innerHTML = " X ";
        }
    }
    
    result1.innerHTML = `<p>${correctCount}問/${totalQuestions}問 正解です</p>`;

}
function checkAnswers2() {
    let correctAnswers = {
        answer3_1: "予測型",
        answer3_2: "アジャイル型",
        answer3_3: "スコープ",
        answer3_4: "反復型",
        answer4_1: "ステークホルダー",
        answer4_2: "要求",
        answer4_3: "価値",
        answer4_4: "無駄",
        answer4_5: "3"
    };

    let userAnswers = {
        answer3_1: document.getElementById("answer3_1").value,
        answer3_2: document.getElementById("answer3_2").value,
        answer3_3: document.getElementById("answer3_3").value,
        answer3_4: document.getElementById("answer3_4").value,
        answer4_1: document.getElementById("answer4_1").value,
        answer4_2: document.getElementById("answer4_2").value,
        answer4_3: document.getElementById("answer4_3").value,
        answer4_4: document.getElementById("answer4_4").value,
        answer4_5: document.getElementById("answer4_5").value
    };

    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    for (let key in correctAnswers) {
        let result = document.getElementById("result" + key.slice(-3));
        if (correctAnswers[key] === userAnswers[key]) {
            result.innerHTML = " O "; 
            correctCount++;
        } else {
            result.innerHTML = " X ";
        }
    }
    
    result2.innerHTML = `<p>${correctCount}問/${totalQuestions}問 正解です</p>`;
}