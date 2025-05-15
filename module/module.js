/* module.js (module) */



const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentMday = now.getDate();
const wdays = ["日", "月", "火", "水", "木", "金", "土"];
const currentWday = wdays[now.getDay()];
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
let currentPeriod = calculatePeriod();



function calculatePeriod(addSaturday = false) {
    switch(true) {
        case (currentWday === '土' && !addSaturday) || currentWday === '日':
            return "";
        case (currentHour === 9 && currentMinute >= 5) || (currentHour === 10 && currentMinute < 45):
            return 1;
        case (currentHour === 10 && currentMinute >= 45) || (currentHour === 11) || (currentHour === 12 && currentMinute < 25):
            return 2;
        case (currentHour === 12 && currentMinute >= 25) || (currentHour === 13) || (currentHour === 14 && currentMinute < 50):
            return 3;
        case (currentHour === 14 && currentMinute >= 50) || (currentHour === 15) || (currentHour === 16 && currentMinute < 30):
            return 4;
        case (currentHour === 16 && currentMinute >= 30) || (currentHour === 17) || (currentHour === 18 && currentMinute < 10):
            return 5;
        case (currentHour === 18 && currentMinute >= 10) || (currentHour === 19 && currentMinute < 50):
            return 6;
        default:
            return "";
    }
}


function addZero(letter) {
    const digitalletter = letter.length === 1 ? '0' + letter: letter;

    return digitalletter;
}


function getWeekNumber() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const gap = (8 - firstDay.getDay()) % 7;
    const firstMonday = (new Date(currentYear, currentMonth, 1 + gap)).getDate();

    if (currentMday < firstMonday) return 0;

    const weekNumber = 1 + Math.floor((currentMday - firstMonday) / 7);
    return weekNumber;
}


function range(start, end, step = 1) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    let result = [];
    if (step > 0) {
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i > end; i += step) {
            result.push(i)
        }
    }
    return result;
}



/*  */
export function toClock(addSaturday = false) {
    const calendar = [currentMonth, currentMday, currentHour, currentMinute].map(c => addZero(String(c)));
    currentPeriod = calculatePeriod(addSaturday);
    const period = currentPeriod ? `(${currentPeriod}限)`: currentPeriod;

    return `<h2>
            <span class="emphasize">${calendar[0]}</span> /
            <span class="emphasize">${calendar[1]}</span> 
            <span class="right-space">(${currentWday})</span> 
            <span class="emphasize">${calendar[2]}</span> : 
            <span class="emphasize">${calendar[3]}</span> ${period}
        </h2>
    `;
}


export function toStudyroom() {
    return `images/studyroom/studyroom${currentMonth + 1}.${getWeekNumber()}.webp`;
}


export function toPracticalModal() {
    if (currentWday === '水') {
        return `<img src="images/practical/wednesday.webp" class="img-fluid">`;
    } else if (currentWday === '木') {
        return `<img src="images/practical/thursday.webp" class="img-fluid">`;
    }
    return "本日、地域共創実習はありません<br><br>";
}


export function reloadPage() {
    const targetTime = [[9, 5], [10, 45], [13, 10], [14, 50], [16, 30], [18, 10]];

    const targets = targetTime.map(([h, m]) => {
        const t = new Date();
        t.setHours(h, m, 0, 0);
        return t;
    });

    const next = targets.find(t => t > now);

    if (next) {
        const timeUntilReload = next - now;
        setTimeout(() => location.reload(), timeUntilReload);
    } else {
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(targetTime[0][0], targetTime[0][1], 0, 0);

        const timeUntilTomorrow = tomorrow - now;
        setTimeout(() => location.reload(), timeUntilTomorrow);
    }
}



export class CSV {
    constructor(raw = "") {
        this.raw = raw;
        this.tableData = [];
        this.html = "";

        this.separate();
    }


    set paragraph(sentence) {  // "date,first,second\n\n4/24,r,i\n12/15,r,u\n4/24 20:00,a,i\n\n"
        this.raw = sentence;
        this.separate();
    }

    get paragraph() {
        return this.html;  // html
    }


    separate() {
        const blocks = this.raw.trim().split('\n\n').slice(1);
        if (blocks.length === 1) {  // [['4/24', 'r', 'i'], ['12/15', 'r', 'u'], ['4/24 20:00', 'a', 'i']]
            this.tableData = blocks[0].split('\n').map(line => line.split(','));
        } else {
            this.tableData = blocks.map(block => 
                block.split('\n').map(line => line.split(','))
            );  // [[['4/24', 'r', 'i'], ['12/15', 'r', 'u']], ['4/24 20:00', 'a', 'i']]
        }
    }

    whatColor(word) {
        switch(word) {
            case "red":
                return "text-danger";
            case "black":
                return "text-dark";
            case "gray":
                return "text-secondary";
            case "blue":
                return "text-primary";
            default:
                return "";
        }
    }
}


class Datetime extends CSV {
    constructor(raw = "") {
        super(raw);
        this.history = false;
    }


    sort (list) {  // [[4242359, 'r', 'i')], [12152359, 'r', 'u'], [4242200, 'a', 'i']]
        if (list.length === 0) {
            return [];
        }
        let min = list[0][0];
        let minIndex = 0;
        for (let i = 1; i < list.length; i++) {
            if (list[i][0] < min) {
                min = list[i][0];
                minIndex = i;
            }
        }
        const newList = list.slice(0, minIndex).concat(list.slice(minIndex + 1));
        return [list[minIndex]].concat(this.sort(newList));
    }

    addWday(sentence) {  // '4/24'  // '12/15'
        const calendar = sentence.split('/');
        const month = calendar[0], mday = calendar[1];
        const date = new Date(currentYear, month - 1, mday);
        const wday = date.getDay();
        return `${month}/${mday} (${wdays[wday]})`;
    }  // '4/24 (木)'  // '12/15 (月)'

    toCalenderDate(datetime) {  // 4242200  // 12152359
        const date = this.addWday(`${Math.floor(datetime / 1000000)}/${Math.floor(datetime % 1000000 / 10000)}`);
        let hour = `${Math.floor(datetime % 10000 / 100)}`, minute = `${datetime % 100}`;
        hour = hour.length === 1 ? "0" + hour: hour;
        minute = minute.length === 1 ? "0" + minute: minute;
        const time = `${hour}:${minute}`;
        if (time === "23:59") {
            return date;  // "12/15 (月)"
        } else {
            return date + " " + time;  // "4/24 (木) 22:00"
        }
    }

    toNumberDate(sentence, history) {  // "4/24 22:00"  // "12/15"
        const datetimes = sentence.split(' ');
        const dates = datetimes[0].split('/');
        let times;
        try {
            times = datetimes[1].split(':');
        } catch {
            times = ['23', '59'];
        }
        
        const settedDatetime = Number(dates[0]) * 1000000 + Number(dates[1]) * 10000 + Number(times[0]) * 100 + Number(times[1]);
        const currentDatetime = (currentMonth + 1) * 1000000 + currentMday * 10000 + currentHour * 100 + currentMinute;
        if (settedDatetime < currentDatetime && !history) {
            return 0;
        } else {
            return settedDatetime;  // 4242200  // 12152359
        }
    }

    refine() {
        let shapedList = [];
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i][0] = this.toNumberDate(this.tableData[i][0], this.history)) {
                shapedList.push(this.tableData[i]);
            } else {
                continue;
            }
        }
        shapedList = this.sort(shapedList);
        for (let i = 0; i < shapedList.length; i++) {
            shapedList[i][0] = this.toCalenderDate(shapedList[i][0]);
        }
        this.tableData = shapedList;  // [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
    }
}



/* CSV */
export class Assignment extends Datetime {
    processing() {
        this.refine();  // this.tableData = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        let table = "", prevDate = "", prevSubject = "";
        for (let i = 0; i < this.tableData.length; i++) {
            const list = this.tableData[i];

            let date = list[0], subject = list[1];
            if (date === prevDate) {
                date = "";
                if (subject === prevSubject) {
                    subject = "";
                }
            }
            let content = list[2], id = list[4];
            if (list[3] !== "") {
                content = `
                    <a class="link-offset-2 link-underline link-underline-opacity-0" href="${list[3]}" target="_blank">
                        ${content}
                    </a>
                `;
            }

            table += `
                <tr data-id="${id}">
                    <td>${date}</td>
                    <td>${subject}</td>
                    <td>
                        ${content}
                    </td>
                    <td>
                        <input class="form-check-input" type="checkbox" data-id="${id}">
                    </td>
                </tr>
            `;

            prevDate = date;
            prevSubject = subject;
        }
        this.html += table;
    }
}


export class Event extends Datetime {
    processing() {
        this.refine();  // this.tableData = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        let table = "", prevDate = "";
        for (let i = 0; i < this.tableData.length; i++) {
            const list = this.tableData[i];

            let date = list[0], time = list[1], content = list[2];
            if (date === prevDate) {
                date = "";
            }

            table += `
                <tr>
                    <td>${date}</td>
                    <td>${time}</td>
                    <td>${content}</td>
                </tr>
            `;
            
            prevDate = date;
        }
        this.html += table;
    }
}


export class Notification extends Datetime {
    processing() {
        this.history = true;  // 履歴を残す
        this.refine();  // this.tableData = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        for (let i = this.tableData.length - 1; i >= 0; i--) {
            const list = this.tableData[i];
            let table = `# ${list[0]} | `;
            let color;
            for (let j = 1; j < list.length; j++) {
                if (color = this.whatColor(list[j])) {
                    j++;
                }
                switch (list[j]) {
                    case "link":
                        table += ` <a href="${list[j + 2]}" class="${color} link-offset-2 link-underline link-underline-opacity-0">${list[j + 1]}</a> `;
                        j += 2;
                        break;
                    case "modal":
                        table += ` <a href="#" data-bs-target="${list[j + 2]}" data-bs-toggle="modal" class="${color} link-offset-2 link-underline link-underline-opacity-0">${list[j + 1]}</a> `;
                        j += 2;
                        break;
                    default:
                        table += `<span class="${color}">${list[j]}</span>`;
                }
                color = "";
            }
            this.html += table + `<br>`;
        }
    }
}


export class Version extends CSV {
    processing() {  // [[5, 6]]
        const list = this.tableData[0];
        const month = addZero(list[0]);
        const mday = addZero(list[1]);
        this.html += `Ver. ${currentYear}.${month}.${mday}. 伊東 颯紀`
    }
}


export class Alert extends CSV {
    processing() {  // [['4/24', 'r', 'i']]
        const list = this.tableData[0];
        let table = "";
        for (let i = 0; i < list.length; i++) {
            switch (list[i]) {
                case "link":
                    table += `<a href="${list[i + 2]}" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                case "modal":
                    table += `<a href="#" data-bs-target="${list[i + 2]}" data-bs-toggle="modal" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                default:
                    table += list[i];
            }
        }
        this.html += table;
    }
}


export class Attendance extends CSV {
// this.tableData = 
//  [[['月'], ['1'], ['共通', 'dj', '英語'], ['3'], ['AI', 'programming', '概論']], [['火'], ['1'], ['IoT', '統計論'], ['4', '5'], ['AI', '開発']]]
    constructor(raw = "") {
        super(raw);
        this.cardList = [];
    }


    processing() {
        for (const block of this.tableData) {
            const wday = block[0][0];
            if (wday !== currentWday) continue;

            let i = 1;
            while (i < block.length) {
                const time = Number(block[i][0]);
                let timeList = [];
                if (!isNaN(time)) {
                    const nextTime = Number(block[i][1]);
                    timeList = !isNaN(nextTime) 
                        ? range(time, nextTime + 1)
                        : [time];
                }
                if (timeList.includes(currentPeriod)) {
                    i++;
                    while (i < block.length && isNaN(Number(block[i][0]))) {
                        this.cardList.push(this.toHtml(block[i]));
                        i++;
                    }
                } else {
                    i++;
                }
            }
        }
    }

    toHtml(table) {
        let imageLink = `<img src="images/attendance/${table[1]}.webp" class="card-img-top">`;
        let stringLink = `${table[2]}`;
        if (table[5] !== "") {
            imageLink = `<a href=${table[5]} target="_blank">
                    ${imageLink}
                </a>
            `;
            stringLink = `<a href=${table[5]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">
                    ${stringLink}
                </a>
            `;
        }
        let classLink = `${table[3]}`;
        if (classLink === "教室一覧") {
            classLink = `<a href="#" data-bs-target="#modalPractice" data-bs-toggle="modal" class="text-dark link-offset-2 link-underline link-underline-opacity-0">
                    ${classLink}
                </a>
            `;
        }
        return `<h3>・${table[0]}</h3>
            <div class="card">
                ${imageLink}
                <div class="card-body">
                    <h4 class="card-title text-center middle-text stretch">${stringLink}</h4>
                    <div class="card-text row justify-content-evenly">
                        <div class="col-5 text-center">${classLink}</div>
                        |
                        <div class="col-5 text-center">${table[4]}</div>
                    </div>
                </div>
            </div>
            <br>
        `;
    }
}
