/* sentence.js (module) */


const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentMonth = currentTime.getMonth();
const currentMday = currentTime.getDate();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
let wdays = ["日", "月", "火", "水", "木", "金", "土"];


class Sentence {
    constructor() {
        this.sentences = [];
        this.processees = "";
    }

    set paragraph(sentence) {  // "date,first,second\n4/24,r,i\n12/15,r,u\n4/24 20:00,a,i\n"
        let element = sentence.split('\n');
        for (let i = 1; i < element.length; i++) {
            if (element[i]) {
                this.sentences.push(element[i]);
            }
        }
    }

    get paragraph() {
        return this.processees;
    }

    whatColor(word) {
        switch(word) {
            case "red":
                return "text-danger";
            case "black":
                return "text-dark";
            case "gray":
                return "text-secondary";
            default:
                return "";
        }
    }
}


class Datetime extends Sentence {
    constructor() {
        super();
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
        let newList = list.slice(0, minIndex).concat(list.slice(minIndex + 1));
        return [list[minIndex]].concat(this.sort(newList));
    }

    addWday(month, mday) {  // 4, 24  // 12, 15
        let date = new Date(currentYear, month - 1, mday);
        let wday = date.getDay();
        return `${month}/${mday} (${wdays[wday]})`;
    }

    toCalenderDate(datetime) {  // 4242200  // 12152359
        let month = Math.floor(datetime / 1000000);
        let day = Math.floor(datetime % 1000000 / 10000);
        let hour = `${Math.floor(datetime % 10000 / 100)}`;
        let minute = `${datetime % 100}`;
        let date = this.addWday(month, day);
        hour = hour.length === 1 ? "0" + hour: hour;
        minute = minute.length === 1 ? "0" + minute: minute;
        let time = `${hour}:${minute}`;
        if (time === "23:59") {
            return date;  // "12/15 (月)"
        } else {
            return date + " " + time;  // "4/24 (木) 22:00"
        }
    }

    toNumberDate(sentence, history) {  // "4/24 22:00"  // "12/15"
        let datetimes = sentence.split(' ');
        let dates = datetimes[0].split('/');
        let times;
        try {
            times = datetimes[1].split(':');
        } catch {
            times = ['23', '59'];
        }
        
        let settedDatetime = Number(dates[0]) * 1000000 + Number(dates[1]) * 10000 + Number(times[0]) * 100 + Number(times[1]);
        let currentDatetime = (currentMonth + 1) * 1000000 + currentMday * 10000 + currentHour * 100 + currentMinute;
        if (settedDatetime < currentDatetime && !history) {
            return 0;
        } else {
            return settedDatetime;  // 4242200  // 12152359
        }
    }

    refine() {  // ["4/24,r,i", "12/15,r,u", "4/24 20:00,a,i"]
        let shapedList = [];
        for (let i = 0; i < this.sentences.length; i++) {
            let cells = this.sentences[i].split(',');
            if (cells[0] = this.toNumberDate(cells[0], this.history)) {
                shapedList.push(cells);
            } else {
                continue;
            }
        }
        shapedList = this.sort(shapedList);
        for (let i = 0; i < shapedList.length; i++) {
            shapedList[i][0] = this.toCalenderDate(shapedList[i][0]);
        }
        this.sentences = shapedList;  // [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
    }
}


export class Assignment extends Datetime {
    processing() {
        this.refine();  // this.sentences = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        let table = "", prevDate = "", prevSubject = "";
        for (let i = 0; i < this.sentences.length; i++) {
            let list = this.sentences[i];

            let date = list[0];
            let subject = list[1];
            if (date === prevDate) {
                date = "";
                if (subject === prevSubject) {
                    subject = "";
                }
            }
            let content = list[2];
            if (list[3] != "") {
                content = `
                    <a class="link-offset-2 link-underline link-underline-opacity-0" href="${list[3]}" target="_blank">
                        ${content}
                    </a>
                `;
            }
            let id = list[4];

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
        this.processees += table;
    }
}


export class Event extends Datetime {
    processing() {
        this.refine();  // this.sentences = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        let table = "", prevDate = "";
        for (let i = 0; i < this.sentences.length; i++) {
            let list = this.sentences[i];

            let date = list[0];
            if (date === prevDate) {
                date = "";
            }
            let time = list[1], content = list[2], id = list[3];

            table += `
                <tr>
                    <td>${date}</td>
                    <td>${time}</td>
                    <td>${content}</td>
                    <td>
                        
                    </td>
                </tr>
            `;
            /* <button class="btn btn-outline-danger heart-btn" data-id="${id}" disabled>
                <i class="bi bi-heart"></i>
            </button>
            <span id="like-count-item${i}">0</span> */

            prevDate = date;
        }
        this.processees += table;
    }
}


export class Notification extends Datetime {
    processing() {
        this.history = true;
        this.refine();  // this.sentences = [['4/24 (木) 20:00','a','i'], ['4/24 (木)','r','i'], ['12/15 (月)','r','u']]
        for (let i = this.sentences.length - 1; i >= 0; i--) {
            let list = this.sentences[i];
            let processee = `# ${list[0]} | `;
            let color;
            for (let j = 1; j < list.length; j++) {
                if (color = this.whatColor(list[j])) {
                    j++;
                }
                switch (list[j]) {
                    case "link":
                        processee += ` <a href="${list[j + 2]}" class="${color} link-offset-2 link-underline link-underline-opacity-0">${list[j + 1]}</a> `;
                        j += 2;
                        break;
                    case "modal":
                        processee += ` <a href="#" data-bs-target="${list[j + 2]}" data-bs-toggle="modal" class="${color} link-offset-2 link-underline link-underline-opacity-0">${list[j + 1]}</a> `;
                        j += 2;
                        break;
                    default:
                        processee += `<span class="${color}">${list[j]}</span>`;
                }
                color = "";
            }
            this.processees += processee + `<br>`;
        }
    }
}


export class Alert extends Sentence {
    processing() {
        let list = this.sentences[0].split(',');
        let processee = "";
        for (let i = 0; i < list.length; i++) {
            switch (list[i]) {
                case "link":
                    processee += `<a href="${list[i + 2]}" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                case "modal":
                    processee += `<a href="#" data-bs-target="${list[i + 2]}" data-bs-toggle="modal" class="alert-link">${list[i + 1]}</a>`;
                    i += 2;
                    break;
                default:
                    processee += list[i];
            }
        }
        this.processees += processee;
    }
}


export class Attendance {
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
            let imgLink = `<img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">`;
            let strLink = `${this.subject[i]}`;
            if (this.url[i] != "") {
                strLink = 
                `<a href=${this.url[i]} target="_blank" class="link-offset-2 link-underline link-underline-opacity-0">
                    ${this.subject[i]}
                </a>`;
                imgLink = 
                `<a href=${this.url[i]} target="_blank">
                    <img src="images/attendance/${this.picture[i]}.webp" class="card-img-top">
                </a>`;
            }
            let clsLink = `${this.classroom[i]}`;
            if (this.classroom[i] == "教室一覧") {
                clsLink =
                `<a href="#" data-bs-target="#modalPractice" data-bs-toggle="modal" class="text-dark link-offset-2 link-underline link-underline-opacity-0">
                    ${this.classroom[i]}
                </a>`;
            }
            templates.push(
                `<h3>
                    ・${this.course[i]}
                </h3>
                <div class="card">
                    ${imgLink}
                    <div class="card-body">
                        <h4 class="card-title text-center middle-text stretch">
                            ${strLink}
                        </h4>
                        <div class="card-text row justify-content-evenly">
                            <div class="col-5 text-center">${clsLink}</div>
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
