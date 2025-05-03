const currentTime = new Date();
let year = currentTime.getFullYear();
let month = currentTime.getMonth();
let mday = currentTime.getDate();
let wdays = ["日", "月", "火", "水", "木", "金", "土"];


class Sentence {
    constructor() {
        this.sentences = [];
        this.processees = "";
    }

    set paragraph(sentence) {
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

    addWday(numbers, addZero) {
        switch(true) {
            case /\//.test(numbers):
                let date = numbers.split('/');
                let wday = (new Date(year, date[0] - 1, date[1])).getDay();
                for (let i = 0; i < date.length; i++) {
                    let datum = String(Number(date[i]));
                    date[i] = datum.length == 1 && addZero ? '0' + datum: datum;
                }
                return `${date[0]}/${date[1]} (${wdays[wday]}) `;
            case /:/.test(numbers):
                let time = numbers.split(':');
                for (let i = 0; i < time.length; i++) {
                    let datum = String(time[i]);
                    time[i] = datum.length == 1 && addZero ? '0' + datum: datum;
                }
                return `${time[0]}:${time[1]} | `;
            default:
                return false;
        }
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


export class Assignment extends Sentence {
    constructor() {
        super();
        this.date = [];
        this.subject = [];
        this.content = [];
        this.url = [];
        this.id = [];
    }

    sort(dateArray) {
        if (dateArray[0].length == 0) {
            return [[], []];
        }
        let min = dateArray[0][0];
        let index = dateArray[1][0];
        let minIndex = 0;
        for (let i = 1; i < dateArray[0].length; i++) {
            if (dateArray[0][i] < min) {
                min = dateArray[0][i];
                index = dateArray[1][i];
                minIndex = i;
            }
        }
        let newDateArray = dateArray[0].slice(0, minIndex).concat(dateArray[0].slice(minIndex+1));
        let newIndexArray = dateArray[1].slice(0, minIndex).concat(dateArray[1].slice(minIndex+1));
        let sortedArray = this.sort([newDateArray, newIndexArray]);
        let sortedDateArray = [min].concat(sortedArray[0]);
        let sortedIndexArray = [index].concat(sortedArray[1]);
        return [sortedDateArray, sortedIndexArray];
    }

    processing() {
        for (let i = 0; i < this.sentences.length; i++) {
            let sentence = this.sentences[i].split(',');
            let numberDates = sentence[0].split('/');
            let numberDate = Number(numberDates[0]) * 100 + Number(numberDates[1]);
            let date = (month + 1) * 100 + mday;
            if (numberDate < date) {
                continue;
            }
            this.date.push(numberDate);
            this.subject.push(sentence[1]);
            this.content.push(sentence[2]);
            this.url.push(sentence[3]);
            this.id.push(sentence[4]);
        }

        let tableContent = "";
        let prevDate = "";
        let prevSubject = "";

        let indexArray = [];
        for (let i = 0; i < this.date.length; i++) {
            indexArray.push(i);
        }
        let newArray = this.sort([this.date, indexArray]);

        for (let i = 0; i < this.date.length; i++) {
            let date = newArray[0][i];

            let designatedDate = "";
            if (date != prevDate) {
                let datum = String(date);
                datum = datum.length == 3 ? datum.slice(0, 1) + '/' + datum.slice(1): datum.slice(0, 2) + '/' + datum.slice(2);
                designatedDate = this.addWday(datum, false);
            }

            let subject = `${this.subject[newArray[1][i]]}`;
            if (subject == prevSubject && date == prevDate) {
                subject = "";
            }

            let newContent = `${this.content[newArray[1][i]]}`;
            if (this.url[newArray[1][i]] != "") {
                newContent =
                `<a class="link-offset-2 link-underline link-underline-opacity-0" href="${this.url[newArray[1][i]]}" target="_blank">
                    ${newContent}
                </a>`;
            }

            tableContent += 
            `<tr data-id="${this.id[newArray[1][i]]}">
                <td>${designatedDate}</td>
                <td>${subject}</td>
                <td>
                    ${newContent}
                </td>
                <td>
                    <input class="form-check-input" type="checkbox" data-id="${this.id[newArray[1][i]]}">
                </td>
            </tr>`;

            prevDate = date;
            prevSubject = subject;
        }
        this.processees += tableContent;
    }
}


export class Notification extends Sentence {
    processing() {
        for (let i = this.sentences.length - 1; i >= 0; i--) {
            let element = this.sentences[i].split(',');
            let processee = "# ";
            for (let j = 0; j < element.length; j++) {
                let number;
                if ((number = this.addWday(element[j], true))) {
                    processee += number;
                    continue;
                }
                switch (element[j]) {
                    case "link":
                        processee += ` <a href="${element[j + 2]}" class="link-offset-2 link-underline link-underline-opacity-0" target="_blank">${element[j + 1]}</a> `;
                        j += 2;
                        break;
                    case "modal":
                        processee += ` <a href="#" data-bs-target="${element[j + 2]}" data-bs-toggle="modal" class="link-offset-2 link-underline link-underline-opacity-0">${element[j + 1]}</a> `;
                        j += 2;
                        break;
                    default:
                        processee += element[j];
                }
            }
            this.processees += processee + `<br>`;
        }
    }
}


export class Alert extends Sentence {
    processing() {
        let element = this.sentences[0].split(',');
        let processee = "";
        for (let i = 0; i < element.length; i++) {
            switch (element[i]) {
                case "link":
                    processee += `<a href="${element[i + 2]}" class="alert-link">${element[i + 1]}</a>`;
                    i += 2;
                    break;
                case "modal":
                    processee += `<a href="#" data-bs-target="${element[i + 2]}" data-bs-toggle="modal" class="alert-link">${element[i + 1]}</a>`;
                    i += 2;
                    break;
                default:
                    processee += element[i];
            }
        }
        this.processees += processee;
    }
}
