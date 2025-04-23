/* assignment.js */

// 課題
class Assignment {
    constructor() {
        this.date = [];
        this.subject = [];
        this.content = [];
        this.isLink = [];
    }

    add(date0, subject0, content0, isLink0) {
        let numberDate = Number(date0.replace(/\//, ''));
        this.date.push(numberDate);
        this.subject.push(subject0);
        this.content.push(content0);
        this.isLink.push(isLink0);
    }

    sort(dateArray) {
        if (dateArray[0].length == 0) {
            return [[], []];
        }
        let max = dateArray[0][0];
        let index = dateArray[1][0];
        let maxIndex = 0;
        for (let i = 1; i < dateArray[0].length; i++) {
            if (dateArray[0][i] > max) {
                max = dateArray[0][i];
                index = dateArray[1][i];
                maxIndex = i;
            }
        }
        let newDateArray = dateArray[0].slice(0, maxIndex).concat(dateArray[0].slice(maxIndex+1));
        let newIndexArray = dateArray[1].slice(0, maxIndex).concat(dateArray[1].slice(maxIndex+1));
        let shuffledArray = sort([newDateArray, newIndexArray]);
        let shuffledDateArray = shuffledArray[0].concat(max);
        let shuffledIndexArray = shuffledArray[1].concat(index);
        return [shuffledDateArray, shuffledIndexArray];
    }

    get to_table() {
        let indexArray = [];
        for (let i = 0; i < this.date.length; i++) {
            indexArray.concat(i);
        }
        let newArray = sort(this.date, indexArray);

    }
}

const a = new Assignment();

a.add("4/24", "自然言語処理", "共起ネットワーク図", true, 15);

let template = a.to_table;


let assignmentTable = document.getElementById(`assignment-table`);

assignmentTable.appendChild();