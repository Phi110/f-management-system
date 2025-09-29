/* module.js (module) */


const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentMday = now.getDate();
let currentNumWday = now.getDay();
const wdays = ["日", "月", "火", "水", "木", "金", "土"];
const currentWday = wdays[currentNumWday];
const weekNumber = getWeekNumber();

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


function getWeekNumber() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const firstSonday = 8 - firstDay.getDay();

    if (currentMday < firstSonday) return 0;

    const weekNumber = 1 + Math.floor((currentMday - firstSonday) / 7);
    return weekNumber;
}


function addZero(letter) {
    const digitalletter = letter.length === 1 ? '0' + letter: letter;

    return digitalletter;
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


function toCourseName(shortened) {
    switch(shortened) {
        case "IA2":
            return "AI";
        case "IS2":
            return "IoT";
        case "DG2":
            return "ゲーム";
        case "DC2":
            return "CG";
        default:
            return shortened;
    }
}


function wdayToNumber(wday) {
    switch (wday) {
        case "月":
            return 1;
        case "火":
            return 2;
        case "水":
            return 3;
        case "木":
            return 4;
        case "金":
            return 5;
        default:
            return wday;
    }
}


/*  */
export function toClock(addSaturday = false) {
    const calendar = [currentMonth + 1, currentMday, currentHour, currentMinute].map(c => addZero(String(c)));
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


export function toStudyroom(studyroom) {
    studyroom.src = `images/studyroom/${currentMonth + 1}.${weekNumber}.webp`;
}


function calculatePosition(naturalHeight, initialWday, ocr=false) {

    let height = 113.75;
    let i = 0;
    while (i < 7) {
        if (height + 107.5 * i > naturalHeight) break;
        i++;
    }

    const maxHeight = 60 + 107.5 * i;

    let valueX, valueY, valueW, valueH;

    if (ocr) {
        valueX = 0.1075;
        valueY = 63 / maxHeight;
        valueW = 0.0525;
        valueH = 90 / maxHeight;
    } else {
        valueX = 0.2975 + 0.117 * (currentPeriod - 1);
        valueY = (57 + 107.5 * (currentNumWday - initialWday)) / maxHeight;
        valueW = 0.117;
        valueH = 107.5 / maxHeight;
    }

    return {left: valueX, top: valueY, width: valueW, height: valueH};

}

export function addHighlight(highlight) {

    const img = document.getElementById(`studyroom`);

    img.onload = async () => {
        const ocrPosition = calculatePosition(img.naturalHeight, undefined, true);

        const x = img.naturalWidth * ocrPosition.left;
        const y = img.naturalHeight * ocrPosition.top;
        const w = img.naturalWidth * ocrPosition.width;
        const h = img.naturalHeight * ocrPosition.height;

        const cropped = document.createElement("canvas");
        cropped.width = w;
        cropped.height = h;
        const ctx = cropped.getContext("2d");

        ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

        const { data: { text } } = await Tesseract.recognize(
            cropped,
            'jpn',
            { langPath: 'https://tessdata.projectnaptha.com/4.0.0' }
        );

        const highlightPosition = calculatePosition(img.naturalHeight, wdayToNumber(text.trim()));

        if (currentPeriod) {
            Object.entries(highlightPosition).forEach(([key, value]) => {
                highlight.style[key] = `${value * 100}%`;
            });
        }
    };   
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


/* CSV */
export class CSV {
    constructor(raw = "") {
        this.raw = raw;
        this.header = "";
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
        const [header, ...blocks] = this.raw.trim().split('\n\n');
        this.header = header;
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
        this.supplement = "";
        this.modal = "";
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
        const month = Math.floor(datetime / 1000000);
        const mday = Math.floor(datetime % 1000000 / 10000);
        let date = this.addWday(`${month}/${mday}`);
        if (mday === 0) date = `${month}月上旬`;
        if (mday === 32) date = `${month}月下旬`;
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
        const month = dates[0];
        let mday;
        switch (dates[1]) {
            case "上旬":
                mday = '0';
                break;
            case "下旬":
                mday = '32';
                break;
            default:
                mday = dates[1];
        }
        let times;
        try {
            times = datetimes[1].split(':');
        } catch {
            times = ['23', '59'];
        }
        
        const settedDatetime = Number(month) * 1000000 + Number(mday) * 10000 + Number(times[0]) * 100 + Number(times[1]);
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

    toModal(index, list) {
        
        if (list.length > 5) {
            this.supplement = list[5];
            if (list[6] !== "" && list.length > 6) {
                this.supplement = `<a href="#" data-bs-target="#modal${index * 10}" data-bs-toggle="modal" class="text-success">\n`
                                + `  ${this.supplement}\n`
                                + `</a>\n`;
            }
        }
        for (let i = 0; i < list.length - 6; i++) {
            const j = index * 10 + i;
            // let regex = new RegExp(this.supplement);
            // const result = regex.test(".webp");
            let nextButton = "", prevButton = "";
            if (i != 0) {
                prevButton = `<button class="btn btn-secondary" data-bs-target="#modal${j - 1}" data-bs-toggle="modal">Prev</button>\n`;
            }
            if (list.length > 7 + i) {
                nextButton = `<button class="btn btn-primary" data-bs-target="#modal${j + 1}" data-bs-toggle="modal">Next</button>\n`;
            }
            this.modal += `<div class="modal fade" id="modal${j}" tabindex="-1" aria-labelledby="modal${j}Label" aria-hidden="true">\n`
                        + `  <div class="modal-dialog modal-dialog-centered modal-lg">\n`
                        + `    <div class="modal-content">\n`
                        + `      <div class="modal-header">\n`
                        + `        <h1 class="modal-title fs-5" id="modal${j}Label">${list[5]}</h1>\n`
                        + `        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n`
                        + `      </div>\n`
                        + `        <div class="modal-body">\n`
                        + `          <img src="images/assignment/${list[6 + i]}.webp" class="img-fluid">\n`
                        + `        </div>\n`
                        + `      <div class="modal-footer">\n`
                        + `        ${prevButton}\n`
                        + `        ${nextButton}\n`
                        + `      </div>\n`
                        + `    </div>\n`
                        + `  </div>\n`
                        + `</div>\n`;
        }
    }
}


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
            let id = list[2], main = list[3];
            if (list[4] !== "") {
                main = `<a class="link-offset-2 link-underline link-underline-opacity-0" href="${list[4]}" target="_blank">\n`
                     + `  ${main}\n`
                     + `</a>\n`;
            }

            this.toModal(i, list);

            table += `<tr data-id="${id}">\n`
                  +  `<td>${date}</td>\n`
                  +  `<td>${subject}</td>\n`
                  +  `<td>\n`
                  +  `  ${main}\n`
                  +  `  ${this.supplement}\n`
                  +  `</td>\n`
                  +  `<td>\n`
                  +  `  <input class="form-check-input" type="checkbox" data-id="${id}">\n`
                  +  `</td>\n`
                  +  `</tr>\n`
                  +  `${this.modal}\n`;

            this.supplement = "";
            this.modal = "";
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

            table += `<tr>\n`
                  +  `<td>${date}</td>\n`
                  +  `<td>${time}</td>\n`
                  +  `<td>${content}</td>\n`
                  +  `</tr>\n`;
            
            prevDate = date;
        }
        this.html += table;
    }
}


export class Test extends Datetime {
    processing() {
        this.refine();  // this.tableData = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        let table = "", prevDate = "";
        for (let i = 0; i < this.tableData.length; i++) {
            const list = this.tableData[i];

            let date = list[0], period = list[1], classroom = list[2], subject = list[3];
            if (date === prevDate) {
                date = "";
            }

            table += `<tr>\n`
                  +  `    <td>${date}</td>\n`
                  +  `    <td>${period}</td>\n`
                  +  `    <td>${classroom}</td>\n`
                  +  `    <td>${subject}</td>\n`
                  +  `</tr>\n`;
            
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
                    case "offcanvas":
                        table += `<a href="#" data-bs-target="${list[j + 2]}" data-bs-toggle="offcanvas" class="${color} link-offset-2 link-underline link-underline-opacity-0">${list[j + 1]}</a> `;
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
        this.html += `Ver. ${currentYear}.${month}.${mday}. 伊東 颯紀`;
    }
}


export class Alert extends CSV {
    processing() {  // [['4/24', 'r', 'i']]
        const list = this.tableData[0];
        let table = "";
        for (let i = 0; i < list.length; i++) {
            switch (list[i]) {
                case "link":
                    table += `<a href="${list[i + 2]}" class="alert-link" target="_blank">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                case "modal":
                    table += `<a href="#" data-bs-target="${list[i + 2]}" data-bs-toggle="modal" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                case "offcanvas":
                    table += `<a href="#" data-bs-target="${list[i + 2]}" data-bs-toggle="offcanvas" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                default:
                    table += list[i];
            }
        }
        this.html += table;
    }
}


/*
曜日
時限
コース,絵,教科,教室,先生,(URL)
*/

export class Attendance {

    constructor() {
        this.body = [];
        this.cardList = [];
    }

    add(sentence) {
        const [header, ...body] = sentence.trim().split('\n\n\n');
        const classByDay = body.map(block => 
            block.split('\n\n').map(lecture => {
                if (lecture.length === 1) {
                    return lecture;
                } else {
                    return lecture.split('\n').map((details, i) => {
                        return i === 0 ? details.split(',').map(num => Number(num)): details.split(',');
                    });
                }
            })
        );

        for (const element of classByDay) {
            const wday = element[0];
            if (wday !== currentWday) continue;

            for (let i = 1; i < element.length; i++) {
                if (!element[i][0].includes(currentPeriod)) continue;
                
                for (let j = 1; j < element[i].length; j++) {
                    element[i][j].unshift(header);
                }
                this.body = this.body.concat(element[i].slice(1));
            }
        }
    }

    toHtml(list) {
        let imageLink = `<img src="images/attendance/${list[2]}.webp" class="card-img-top">`;
        let stringLink = `${list[1]}`;
        if (list[5] !== "") {
            imageLink = `<a href=${list[5]} target="_blank">\n`
                      + `  ${imageLink}\n`
                      + `</a>`;
            
            stringLink = `<a href=${list[5]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">\n`
                       + `  ${stringLink}\n`
                       + `</a>`;
        }
        let classLink = `${list[3]}`;
        if (classLink === "教室一覧") {
            classLink = `<a href="#" data-bs-target="#modalPractice" data-bs-toggle="modal" class="text-dark link-offset-2 link-underline link-underline-opacity-0">
                    ${classLink}
                </a>
            `;
        }

        this.cardList.push(
            `<h3>・${toCourseName(list[0])}</h3>\n`
            + `<div class="card">\n`
            + `  ${imageLink}\n`
            + `  <div class="card-body">\n`
            + `    <h4 class="card-title text-center middle-text stretch">${stringLink}</h4>\n`
            + `    <div class="card-text row justify-content-evenly">\n`
            + `      <div class="col-5 text-center">${classLink}</div>\n`
            + `      |\n`
            + `      <div class="col-5 text-center">${list[4]}</div>\n`
            + `    </div>\n`
            + `  </div>\n`
            + `</div>\n`
            + `<br>\n`
        );
    }

    processing() {
        this.body.forEach(element => {
            this.toHtml(element);
        })
    }
}


export class Curriculum {

    constructor() {
        this.header = [];
        this.body = [];
        this.modal = "";
    }

    add(sentence) {
        let [header, ...body] = sentence.trim().split('\n\n\n');
        const classByDay = body.map(block => 
            block.split('\n\n').map(lecture => {
                if (lecture.length === 1) {
                    return wdayToNumber(lecture);
                } else {
                    return lecture.split('\n').map((details, i) => {
                        return i === 0 ? details.split(',').map(num => Number(num)): details.split(',')[4];
                    });
                }
            })
        );
        if (header === "共通") header = "English";
        this.header.push(header);
        this.body.push(classByDay);
    }

    toMap(index, course) {
        function calculateCoords(wday, period, urls) {
            let areas = "";
            let left, right, top, bottom;
            if (course === "English") {
                period = period[0];
                let x, y;
                const surplus = {
                    1: 0,
                    5: 3
                };

                for (let i = 0; i < urls.length; i++) {
                    if (!urls[i]) continue;
                    if (period === 1){
                        x = surplus[wday] + i + 1;
                        y = 1;
                    } else if (period === 2 && i > 0) {
                        x = surplus[wday] + i;
                        y = 3;
                    } else {
                        x = surplus[wday] + i + 1;
                        y = 2;
                    }
                    left = 34 + 95 * (x - 1);
                    right = 34 + 95 * x;
                    top = 34 + 66 * (y - 1);
                    bottom = 34 + 66 * y;
                    areas += `<area shape="rect" target="_blank" coords="${left},${top},${right},${bottom}" href="${urls[i]}">\n`;
                }
            } else {
                const url = urls[0];
                left = 30 + 115 * (wday - 1);
                right = 30 + 115 * wday;
                top = 25 + 75 * (period[0] - 1);
                bottom = 25 + 75 * period[period.length - 1];
                areas += `<area shape="rect" target="_blank" coords="${left},${top},${right},${bottom}" href="${url}">\n`;
            }

            return areas;
        }

        const curriculumCourse = this.body[index];
 
        let curriculumMap = "";
        if (course !== "English") {
            curriculumMap += `<area shape="rect" target="_blank" coords="30,25,145,175" href="#" data-bs-target="#modalEnglish" data-bs-toggle="modal">\n`
                          +  `<area shape="rect" target="_blank" coords="490,25,605,175" href="#" data-bs-target="#modalEnglish" data-bs-toggle="modal">\n`;
        }
        let wday;
        curriculumCourse.forEach(byDay => {
            byDay.forEach((element, i) => {
                if (i === 0) {
                    wday = element;
                    return;
                }
                const [period, ...url] = element;
                if (url.some(item => item !== "")) {
                    const area = calculateCoords(wday, period, url);
                    curriculumMap += area;
                }
            })
        });

        return curriculumMap;
    }

    makeFooter(index) {
        let pageItem = "";
        if (index !== 0) {
            pageItem += `<li class="page-item">\n`
                      + `  <a class="page-link" href="#" data-bs-target="#modal${this.header[index - 1]}" data-bs-toggle="modal" aria-label="Previous">\n`
                      + `    <span aria-hidden="true">&laquo;</span>\n`
                      + `  </a>\n`
                      + `</li>`;
        }

        this.header.forEach((course, i) => {
            if (i === index) {
                pageItem += `<li class="page-item disabled"><a class="page-link" href="#">${course.slice(0, 2)}</a></li>\n`;
            } else {
                pageItem += `<li class="page-item"><a class="page-link" href="#" data-bs-target="#modal${course}" data-bs-toggle="modal">${course.slice(0, 2)}</a></li>\n`;
            }
        })

        if (index !== this.header.length - 1) {
            pageItem += `<li class="page-item">\n`
                     + `  <a class="page-link" href="#" data-bs-target="#modal${this.header[index + 1]}" data-bs-toggle="modal" aria-label="Next">\n`
                     + `    <span aria-hidden="true">&raquo;</span>\n`
                     + `  </a>\n`
                     + `</li>`;
        }

        const pageNavigation = `<nav aria-label="Page navigation">\n`
                             + `  <ul class="pagination">\n`
                             + `    ${pageItem}\n`
                             + `  </ul>\n`
                             + `</nav>`;

        return pageNavigation;
    }

    toModal() {
        for (let i = 0; i < this.header.length; i++) {
            const course = this.header[i];

            const header = `<h3 class="modal-title fs-5" id="modal${course}Label">後期 ${course}</h3>\n`
                         + `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
            const body = `<figure>\n`
                       + `  <div class="highlight-container">`
                       + `    <img src="images/curriculum/curriculum${course}.webp" usemap="#curriculum${course}-map" class="img-fluid">\n`
                       + `    <div id="curriculum-highlight-${course}" class="highlight"></div>`
                       + `  </div>\n`
                       + `  <figcaption class="small-text text-end mb-0">※クリックすると授業のURLに飛べます</figcaption>\n`
                       + `</figure>\n`
                       + `<map name="curriculum${course}-map">\n${this.toMap(i, course)}</map>`;
            const footer = `${this.makeFooter(i)}`;

            this.modal += `<div class="modal fade" id="modal${course}" aria-hidden="true" aria-labelledby="modal${course}Label" tabindex="-1">\n`
                  + `  <div class="modal-dialog custom-modal modal-dialog-centered">\n`
                  + `    <div class="modal-content">\n`
                  + `      <div class="modal-header">\n${header}\n      </div>\n`
                  + `      <div class="modal-body d-flex justify-content-center">\n${body}\n      </div>\n`
                  + `      <div class="modal-footer">\n${footer}\n      </div>\n`
                  + `    </div>\n`
                  + `  </div>\n`
                  + `</div>\n`;

            if (course === "English" || !currentPeriod || currentNumWday > 5) continue;

            document.addEventListener("shown.bs.modal", () => {
                const curriculumHighlight = document.getElementById(`curriculum-highlight-${course}`);

                const highlightPosition = {
                    left: (30 + 115 * (currentNumWday - 1)) / 605,
                    top: (25 + 75 * (currentPeriod - 1)) / 475,
                    width: 115 / 605,
                    height: 75 / 475
                };

                Object.entries(highlightPosition).forEach(([key, value]) => {
                    curriculumHighlight.style[key] = `${value * 100}%`;
                });
            });
        }
    }
}

const c = new Curriculum();
c.add(`共通


月

1
英語コミュニケーションⅡbC,dj,353,門田 裕次,
英語コミュニケーションⅡbE,dj,342,菅谷 孝義,
英語コミュニケーションⅡbF,dj,376,吉野 瑞男,

2
英語コミュニケーションⅡbA,dj,341,津森 紀乃,https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=87789
英語コミュニケーションⅡbB,dj,353,門田 裕次,
英語コミュニケーションⅡbD,dj,342,菅谷 孝義,
英語コミュニケーションⅡbG,dj,376,吉野 瑞男,


水

2,3,4,5
地域共創デザイン実習,club,教室一覧,-,


金

1
英語コミュニケーションⅡbB,dj,345,門田 裕次,
英語コミュニケーションⅡbD,dj,342,菅谷 孝義,
英語コミュニケーションⅡbG,dj,376,吉野 瑞男,

2
英語コミュニケーションⅡbA,dj,341,津森 紀乃,https://lms-tokyo.iput.ac.jp/mod/attendance/view.php?id=87789
英語コミュニケーションⅡbC,dj,345,門田 裕次,
英語コミュニケーションⅡbE,dj,342,菅谷 孝義,
英語コミュニケーションⅡbF,dj,376,吉野 瑞男,
`);

c.toModal();
