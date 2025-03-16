/* fms.js */

const currentTime = new Date();
const year = currentTime.getFullYear();
const month = currentTime.getMonth();
const date = currentTime.getDate();
const day = currentTime.getDay();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
let period = "--";
let gen = "限"

/* 現在時 */
if ((day==0 || day==6)) {
} else if ((hour==9 && minute>5) || (hour==10 && minute<=45)) {
    period = 1;
} else if ((hour==10 && minute>45) || (hour==11) || (hour==12 && minute<=25)) {
    period = 2;
} else if ((hour==12 && minute>25) || (hour==13 && minute<= 10)) {
    period = "お昼休み"; gen = "";
} else if ((hour==13 && minute>10) || (hour==14 && minute<=50)) {
    period = 3;
} else if ((hour==14 && minute>50) || (hour==15) || (hour==16 && minute<=30)) {
    period = 4;
} else if ((hour==16 && minute>30) || (hour==17) || (hour==18 && minute<=10)) {
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
    <span class="emphasize">${li[3]}</span> (${period}${gen})
</h2>`;


/* 出席 */

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
        if (this.course.length == 0) {
            templates.push(true,
                `<div class="card">
                    <img id="design" src="images/attendance/moon.webp" class="card-img-top">
                    <div class="card-body">
                        <h4 class="card-title">No Class</h4>
                        <div class="card-text">-</div>
                    </div>
                </div>`
            );
        } else {
            templates.push(false);
            for (let i = 0; i < this.course.length; i++) {
                templates.push(
                    `<h3>
                        ・${this.course[i]}
                    </h3>
                    <div class="card">
                        <a href=${this.url[i]}>
                            <img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">
                        </a>
                        <div class="card-body">
                            <h4 class="card-title text-center middle-text stretch">
                                <a href=${this.url[i]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">
                                    ${this.subject[i]}
                                </a>
                            </h4>
                            <div class="card-text row justify-content-evenly">
                                <div class="col-5 text-center middle-text">${this.classroom[i]}</div>
                                |
                                <div class="col-5 text-center middle-text">${this.teacher[i]}</div>
                            </div>
                        </div>
                    </div>
                    <br>`
                );
            }
        }
        return templates;
    }
}

const a = new Attendance();

if (day == 1) {
    if (period == 1) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aB", "345", "門田 裕次", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 2) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aA", "341", "津森 紀乃", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 3) {
        // AI
        a.add("AI", "programming", "プログラミング概論", "351", "齊藤亜・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT
        a.add("IoT", "rainy", "確率統計論", "342", "兒玉・野村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 4) {
        // AI
        a.add("AI", "rainy", "確率統計論", "351", "兒玉・野村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 5) {
        // AI
        a.add("AI", "tree", "自然言語処理", "351", "町出・野村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
}

if (day == 2) {
    if (period == 1) {
        // IoT
        a.add("IoT", "programming", "プログラミング概論", "351", "齊藤亜・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 2) {
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ", "354", "藤井・山本裕", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 3) {
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ", "354", "藤井・山本裕", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 4) {
        // AI
        a.add("AI", "read", "人工知能システム開発 Ⅰ", "371・373", "神沼・齊藤亜", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT
        a.add("IoT", "meeting", "IoTシステム開発 Ⅰ", "354", "藤井・山本裕", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 5) {
        // AI
        a.add("AI", "read", "人工知能システム開発 Ⅰ", "371・373", "神沼・齊藤亜", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT
        a.add("IoT", "video", "担任ミーティング Ⅱ", "354", "兒玉 賢史", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        
    }
    if (period == 6) {
        // AI
        a.add("AI", "video", "担任ミーティング Ⅱ", "371・373", "駒井 章治", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
}

if (day == 3) {
    if (period == 1) {
        // 共通
        a.add("共通", "suit", "キャリアガイダンス Ⅰ", "-", "-", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (2 <= period && period <= 5) {
        // 共通
        a.add("共通", "club", "地域共創デザイン実習", "-", "-", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
}

if (day == 4) {
    if (period == 1) {
        // AI
        a.add("AI", "exam", "人工知能数学", "311", "三宅・神田", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT-A
        a.add("IoT-A", "crane", "センサ・アクチュエータ", "361", "西田 麻美", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 2) {
        // AI
        a.add("AI", "speak", "人工知能基礎", "311", "齊藤亜・神田", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT-B
        a.add("IoT-B", "crane", "センサ・アクチュエータ", "251", "西田 麻美", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (3 <= period && period <= 4) {
        // 共通
        a.add("共通", "club", "地域共創デザイン実習", "-", "-", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
}

if (day == 5) {
    if (period == 1) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aB", "345", "門田 裕次", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 2) {
        // 共通
        a.add("共通", "dj", "英語コミュニケーション Ⅱ aA", "341", "津森 紀乃", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 3) {
        // AI
        a.add("AI", "bookshelf", "データベース基礎と応用", "311", "飛澤・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
        // IoT
        a.add("IoT", "power", "制御工学基礎", "351", "水上憲・中村", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
    if (period == 4) {
        // IoT
        a.add("IoT", "bookshelf", "データベース基礎と応用", "351", "飛澤・山口", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=72858");
    }
}

let template = a.to_card;

if (template[0]) {
    let card = document.getElementById(`card0`);
    card.innerHTML = template[1];
} else {
    for (let i = 0; i < template.length-1; i++) {
        let card = document.getElementById(`card${i}`);
        card.innerHTML = template[i+1];
    }
}


/* 便利 */
// 文字数チェッカー
function countString() {
    let input = document.getElementById("count").value;
    let times1 = document.getElementById("times1");
    let times2 = document.getElementById("times2");
    let count = input.length;
    let count2 = input.replace(/[\n\r]/g, '').length;
    times1.innerHTML = `<span class="text-danger left-space">${String(count)}</span>`;
    times2.innerHTML = `<span class="text-danger left-space">${String(count2)}</span>`;
}

/* 自動採点 */
// 選択
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

function checkAnswers2(th) {
    let word = "quiz" + th;
    let selected = document.querySelector(`input[name=${word}]:checked`);
    let outcome = document.getElementById("outcome" + String(th));
    if (selected.value == "1") {
        outcome.innerHTML = '<i class="bi bi-circle text-success left-space"></i>';
    } else {
        outcome.innerHTML = '<i class="bi bi-x-lg text-danger left-space"></i>';
    }
}

function checkAnswers3(th, answer) {
    let input = document.getElementById("input" + String(th));
    let consequence = document.getElementById("consequence" + String(th));
    if (input.value == answer) {
        consequence.innerHTML = '<i class="bi bi-circle text-success left-space"></i>';
    } else {
        consequence.innerHTML = '<i class="bi bi-x-lg text-danger left-space"></i>';
    }
}
// C++
function showAnswer(th) {
    let correctAnswer = [
`#include &lt;stdio.h&gt;
int main(void) {
    int n;
    printf("(n? (65 <= n <= 122)) ");
    scanf("%d", &n);

    /* ここにコードを書きましょう */
    <span class="text-danger">printf("%c&#92;n", n);</span>
}`,
`#include &lt;stdio.h&gt;
#define N 256
int main(void) {
    char text[N];
    printf("(text?) ");
    fgets(text, sizeof(text), stdin);

    /* ここにコードを書きましょう */
    <span class="text-danger">int gap = 'a' - 'A';
    for (int i = 0; i &lt; sizeof(text); i++) {
        if ('A' &lt;= text[i] && text[i] &lt;= 'Z') {
            text[i] += gap;
        } else if ('a' &lt;= text[i] && text[i] &lt;= 'z') {
            text[i] -= gap;
        }
    }
    printf("%s&#92;n", text);</span>
}`,
`#include &lt;stdio.h&gt;
void descending_order(int* a, int* b, int* c);
int main() {
    int x, y, z;
    printf("(x?) "); scanf("%d", &x);
    printf("(y?) "); scanf("%d", &y);
    printf("(z?) "); scanf("%d", &z);
    descending_order(&x, &y, &z);
    printf("%d&#92;n", x);
    printf("%d&#92;n", y);
    printf("%d&#92;n", z);
}
void descending_order(int* a, int* b, int* c) {
    /* ここにコードを書きましょう */
    <span class="text-danger">int var;
    if (*c > *a) {
        var = *a;
        *a = *c;
        *c = var;
    }
    if (*b > *a) {
        var = *a;
        *a = *b;
        *b = var;
    }
    if (*c > *b) {
        var = *b;
        *b = *c;
        *c = var;
    }</span>
}`,
`#include &lt;iostream&gt;
#include &lt;<span class="text-success">fstream</span>&gt;
#include &lt;string&gt;
#include &ltvector&gt;
using namespace std;

int <span class="text-primary">gp</span>(string grade) {
    if (grade == "D") {
        return 0;
    } else if (grade == "C") {
        return 1;
    } else if (grade == "B") {
        return 2;
    } else if (grade == "A") {
        return 3;
    } else if (grade == "S") {
        return 4;
    } else {
        return -1;
    }
}

int main() {
    <span class="text-success">ifstream</span> in_file {"cpp.0.input.csv"};
    <span class="text-success">ofstream</span> out_file {"cpp.0.output.csv"};
    string line;
    while (getline(in_file, line)) {
        int end_1st = line.<span class="text-danger">find</span>(",", 0);
        string number = line.<span class="text-danger">substr</span>(0, end_1st);
        if (number == "Number") {
            out_file << "Number,Python,C++,Math,English,GPA" << endl;
            continue;
        }
        int end_2nd = line<span class="text-danger">.find</span>(",", end_1st+1);
        int end_3rd = line<span class="text-danger">.find</span>(",", end_2nd+1);
        int end_4th = line<span class="text-danger">.find</span>(",", end_3rd+1);
        int end_5th = line<span class="text-danger">.find</span>(",", end_4th+1);
        string text = line.substr(0, end_5th-1);
        string python = line<span class="text-danger">.substr</span>(end_1st+1, end_2nd-end_1st-1);
        string cpp = line<span class="text-danger">.substr</span>(end_2nd+1, end_3rd-end_2nd-1);
        string math = line<span class="text-danger">.substr</span>(end_3rd+1, end_4th-end_3rd-1);
        string english = line<span class="text-danger">.substr</span>(end_4th+1, end_5th-end_4th-1);
        int gpa = (<span class="text-primary">gp</span>(python) + <span class="text-primary">gp</span>(cpp) + <span class="text-primary">gp</span>(math) + <span class="text-primary">gp</span>(english)) / 4;
        out_file << text + "," << gpa << endl;
    }
    in_file.close();
    out_file.close();
}`,
`#include &lt;iostream&gt;
using namespace std;

int <span class="text-primary">fibonacci</span>(int n) {
    <span class="text-danger">if (n == 0 || n == 1) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }</span>
}

int main() {
    int n;
    cout &lt;&lt; "(n?) "; cin &gt;&gt; n;
    cout &lt;&lt; <span class="text-primary">fibonacci</span>(n) &lt;&lt; endl;
}`,
`class Meeting {
public:
    /* ここにコードを書きましょう */
    int <span class="text-primary">frequency</span>;
    string <span class="text-primary">doing</span>;
    <span class="text-warning">Meeting</span> () {}
    <span class="text-warning">Meeting</span> (string doing0) {
        frequency = 3;
        doing = doing0;
    }
    <span class="text-warning">Meeting</span> (int frequency0, string doing0) {
        frequency = frequency0;
        doing = doing0;
    }
};

class IT {
public:
    /* ここにコードを書きましょう */
    string <span class="text-primary">name</span>;
    int <span class="text-primary">number</span>;
    Meeting meeting;
    <span class="text-warning">IT</span> () {}
    <span class="text-warning">IT</span> (string name0, Meeting meeting0) {
        name = name0;
        number = 30;
        meeting = meeting0;
    }
    <span class="text-warning">IT</span> (string name0, int number0, Meeting meeting0) {
        name = name0;
        number = number0;
        meeting = meeting0;
    }
    string <span class="text-success">info</span>() {
        return name + "クラス: " + to_string(number) + "人、月に"
         + to_string(meeting.frequency) + "回" + meeting.doing + "をする。";
    }
};

class Students {
public:
    /* ここにコードを書きましょう */
    vector<IT> <span class="text-primary">students</span>;
    bool <span class="text-primary">is_fun</span>;
    <span class="text-warning">Students</span> () {}
    <span class="text-warning">Students</span> (vector<IT> students0, bool is_fun0) {
        students = students0;
        is_fun = is_fun0;
    }
    string <span class="text-success">info</span>() {
        string sum_string = "";
        string fun = "楽しくない";
        int sum = 0;
        int f = 0;
        for (int i = 0; i < students.size(); i++) {
            sum_string += students[i].info() + "&#92;n";
            sum += students[i].number;
            f += students[i].meeting.frequency;
        }
        if (is_fun) {
            fun = "楽しい";
        }
        sum_string += "===&#92;nTotal: " + to_string(sum) + "人&#92;nAverage: 月" 
            + to_string(f/students.size()) + "回&#92;nEveryone: " + fun;
        return sum_string;
    }
};`
    ];
    let show = document.getElementById("show" + String(th));
    show.innerHTML = `<pre class="redcode"><code>${correctAnswer[th]}</code></pre>`;
}

// 記述
function checkAnswers_discription(th) {
    let correctAnswer = {
        7: "予測型開発は、顧客の要求事項であるスコープを最も重視すべき制約条件とし、スケジュール・コストの変化を許容する。一方、適応型開発は、開発期間中にスコープが変化することをあらかじめ想定し、スケジュールとコストを固定する。",
        8: "マトリックス型組織では、組織の管理者とプロジェクト管理者からの業務指示が集中し、ダブルバインドが発生する可能性があるため、メンバーへの配慮が必要である。",
        9: "リーダーシップとは、変革を起こし、変革の方向性を決めることであるのに対し、マネジメントとは、計画に基づき業務を進めながら、複雑な状況にうまく対処することである。"
    };
    let constraints = {
        7: [100, "スコープ", "スケジュール", "コスト"],
        8: [75, "組織", "プロジェクト", "業務指示"],
        9: [75, "変革", "計画"]
    };
    
    let torf = document.getElementById("torf" + String(th));
    let discript = document.getElementById("discript" + String(th));
    let input = document.getElementById("test" + String(th)).value;
    let input_string = input.replace(/[\n\r]/g, '');
    let count = input_string.length;
    let contains = constraints[th];
    let num = contains[0];
    let mark;
    let stricted_word = "";
    if (num * 0.8 <= count && count <= num * 1.2) {
        mark = '<i class="bi bi-circle text-success"></i>';
    } else if (num * 0.6 <= count && count <= num * 1.4) {
        mark = '<i class="bi bi-triangle text-primary"></i>';
    } else {
        mark = '<i class="bi bi-x-lg text-danger"></i>';
    }
    for (let i = 1; i < contains.length; i++) {
        let regex = new RegExp(contains[i]);
        if (regex.test(input_string)) {
            stricted_word += `${contains[i]}<i class="bi bi-circle text-success right-space"></i>`;
        } else {
            stricted_word += `${contains[i]}<i class="bi bi-x-lg text-danger right-space"></i>`;
        }
    }
    torf.innerHTML = `<span class="left-space"> 語句）${stricted_word} </span> <span class="left-space"> 字数）${count} 字${mark} </span>`;
    discript.innerHTML = `<p class="top-space left-space text-danger">解答例:<br> <span class="left-space"> ${correctAnswer[th]} </span> </p>`;
}