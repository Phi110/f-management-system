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
} else if ((hour==12 && minute>=25) || (hour==13 && minute<10)) {
    period = "(お昼休み)";
} else if ((hour==13 && minute>=10) || (hour==14 && minute<50)) {
    period = 3;
} else if ((hour==14 && minute>=50) || (hour==15) || (hour==16 && minute<30)) {
    period = 4;
} else if ((hour==16 && minute>=30) || (hour==17) || (hour==18 && minute<10)) {
    period = 5;
} else if ((hour==18 && minute>=10) || (hour==19 && minute<50)) {
    period = 6;
} /*else if ((hour==19 && minute>50) || (hour==20) || (hour==21 && minute<=30)) {
    period = 7;
}*/

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


// 出席
class Attendance {
    constructor() {
        this.course = [];
        this.picture = [];
        this.subject = [];
        this.classroom = [];
        this.teacher = [];
        this.url = [];
    }

    add(course0, picture0, subject0, classroom0, teacher0, url0) {
        this.course.push(course0);
        this.picture.push(picture0);
        this.subject.push(subject0);
        this.classroom.push(classroom0);
        this.teacher.push(teacher0);
        this.url.push(url0);
    }

    get to_card() {
        let templates = [];
        for (let i = 0; i < this.course.length; i++) {
            let picLink = `<img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">`;
            let strLink = `${this.subject[i]}`;
            if (this.url[i] != "") {
                strLink = 
                `<a href=${this.url[i]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">
                    ${this.subject[i]}
                </a>`;
                picLink = 
                `<a href=${this.url[i]} target="_blank">
                    <img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">
                </a>`;
            }
            templates.push(
                `<h3>
                    ・${this.course[i]}
                </h3>
                <div class="card">
                    ${picLink}
                    <div class="card-body">
                        <h4 class="card-title text-center middle-text stretch">
                            ${strLink}
                        </h4>
                        <div class="card-text row justify-content-evenly">
                            <div class="col-5 text-center">${this.classroom[i]}</div>
                            |
                            <div class="col-5 text-center">${this.teacher[i]}</div>
                        </div>
                    </div>
                </div>
                <br>`
            );
        }
        return templates;
    }
}

const a = new Attendance();


if (day == 1) {
    if (period == 1) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aB", "345", "門田 裕次", "");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aD", "342", "菅谷 孝義", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78804");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aG", "376", "吉野 瑞男", "");
    }
    if (period == 2) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aA", "341", "津森 紀乃", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79016");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aC", "345", "門田 裕次", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=77820");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aE", "342", "菅谷 孝義", "");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aF", "376", "吉野 瑞男", "");
    }
    if (period == 3) {
        // AI
        a.add("AI", "programming", "プログラミング概論A", "351", "齊藤亜・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78892");
        // IoT
        a.add("IoT", "rainy", "確率統計論B", "342", "兒玉・野村", "");
    }
    if (period == 4) {
        // AI
        a.add("AI", "rainy", "確率統計論A", "351", "兒玉・野村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79268");
    }
    if (period == 5) {
        // AI
        a.add("AI", "tree", "自然言語処理A", "351", "町出・野村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79314");
    }
}

if (day == 2) {
    if (period == 1) {
        // IoT
        a.add("IoT", "programming", "プログラミング概論B", "351", "齊藤亜・山口", "");
    }
    if (period == 2) {
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ A", "354", "藤井・山本裕", "");
    }
    if (period == 3) {
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ A", "354", "藤井・山本裕", "");
    }
    if (period == 4) {
        // AI
        a.add("AI", "read", "人工知能システム開発 Ⅰ A", "371・373", "神沼・齊藤亜", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79076");
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ A", "354", "藤井・山本裕", "");
    }
    if (period == 5) {
        // AI
        a.add("AI", "read", "人工知能システム開発 Ⅰ A", "371・373", "神沼・齊藤亜", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79076");
        // IoT
        a.add("IoT", "video", "担任ミーティング Ⅱ", "354", "兒玉 賢史", "");
        
    }
    if (period == 6) {
        // AI
        a.add("AI", "video", "担任ミーティング Ⅱ", "371・373", "駒井 章治", "https://lms-tokyo.iput.ac.jp/course/view.php?id=3320");
    }
}

if (day == 3) {
    if (period == 1) {
        // 共通
        a.add("共通", "suit", "キャリアガイダンス Ⅰ", "-", "-", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78899");
    }
    if (2 <= period && period <= 5) {
        // 共通
        a.add("共通", "club", "地域共創デザイン実習", "-", "-", "https://lms-tokyo.iput.ac.jp/my/courses.php");
    }
}

if (day == 4) {
    if (period == 1) {
        // AI
        a.add("AI", "exam", "人工知能数学A", "311", "三宅・神田", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79662");
        // IoT-A
        a.add("IoT-A", "crane", "センサ・アクチュエータA", "361", "西田 麻美", "");
    }
    if (period == 2) {
        // AI
        a.add("AI", "speak", "人工知能基礎A", "311", "齊藤亜・神田", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78895");
        // IoT-B
        a.add("IoT-B", "crane", "センサ・アクチュエータB", "251", "西田 麻美", "");
    }
    if (3 <= period && period <= 4) {
        // 共通
        a.add("共通", "club", "地域共創デザイン実習", "-", "-", "");
    }
}

if (day == 5) {
    if (period == 1) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aB", "345", "門田 裕次", "");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aD", "342", "菅谷 孝義", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78804");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aG", "376", "吉野 瑞男", "");
    }
    if (period == 2) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aA", "341", "津森 紀乃", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79016");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aC", "345", "門田 裕次", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=77820");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aE", "342", "菅谷 孝義", "");
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aF", "376", "吉野 瑞男", "");
    }
    if (period == 3) {
        // AI
        a.add("AI", "bookshelf", "データベース基礎と応用A", "311", "飛澤・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=79755");
        // IoT
        a.add("IoT", "power", "制御工学基礎A", "351", "水上憲・中村", "");
    }
    if (period == 4) {
        // IoT
        a.add("IoT", "bookshelf", "データベース基礎と応用B", "351", "飛澤・山口", "");
    }
}

if (a.course.length != 0) {
    let card0 = document.getElementById(`card0`);
    card0.innerHTML = "";
}

let template = a.to_card;

for (let i = 0; i < template.length; i++) {
    let card = document.getElementById(`card${i}`);
    card.innerHTML = template[i];
}