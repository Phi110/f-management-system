/* attendance.js */

// 出席
import { Attendance } from "../module/sentence.js";

const currentTime = new Date();
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
        a.add("共通", "suit", "キャリアガイダンス Ⅰ", "Bホール", "-", "https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=78899");
    }
    if (2 <= period && period <= 5) {
        // 共通
        a.add("共通", "club", "地域共創デザイン実習", "教室一覧", "-", "https://lms-tokyo.iput.ac.jp/course/view.php?id=3089");
    }
}

if (day == 4) {
    if (period == 1) {
        // AI                                                                                                                                                                       u
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
        a.add("共通", "club", "地域共創デザイン実習", "教室一覧", "-", "https://lms-tokyo.iput.ac.jp/course/view.php?id=3089");
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