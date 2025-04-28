const currentTime = new Date();
let year = currentTime.getFullYear();
let month = currentTime.getMonth();
let mday = currentTime.getDate();
let wdays = ["日", "月", "火", "水", "木", "金", "土"];

export class Assignment {
    constructor() {
        this.date = [];
        this.subject = [];
        this.content = [];
        this.url = [];
        this.id = [];
    }

    add(date0, subject0, content0, url0, id0) {
        let numberDates = date0.split('/');
        let numberDate = Number(numberDates[0]) * 100 + Number(numberDates[1]);
        let date = (month + 1) * 100 + mday;
        if (numberDate < date) {
            return;
        }
        this.date.push(numberDate);
        this.subject.push(subject0);
        this.content.push(content0);
        this.url.push(url0);
        this.id.push(id0);
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

    get to_table() {
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
                let designatedMonth = Math.floor(date / 100);
                let designatedMday = date % 100;
                let designatedWday = (new Date(year, designatedMonth - 1, designatedMday)).getDay();
                designatedDate = `${designatedMonth}/${designatedMday} (${wdays[designatedWday]})`;
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
        return tableContent;
    }
}