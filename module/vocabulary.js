/* vocabulary.js (module) */
// @ts-nocheck


function getRandomInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    const gap = max - min;
    return Math.floor(Math.random() * gap) + min;
}


function getUniqueRandomInt(min, max, count, exclude = []) {
    const numbers = [];
    for (let i = min; i <= max; i++) {
        if (!exclude.includes(i)) {
            numbers.push(i);
        }
    }

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, count);
}


class Vocabulary {
    constructor(rawSentence = "") {
        this.rawSentence = "";
        this.list = [];
        this.html = "";
    }

    set paragraph(rawSentence) {
        const rawList = rawSentence.split('\n\n');
        let list = [];
        for (let i = 0; i < rawList.length; i += 2) {
            const newList = rawList[i].split('\n');
            newList.push(rawList[i + 1]);
            list.push(newList);
        }
        this.list = list.map(innerArray => innerArray.filter(element => element.length > 1));
    }

    get paragraph() {
        return this.html;
    }

    makeVocabList() {
        return this.list.map(innerArray => innerArray[0].toLowerCase());
    }

    makeHint() {
        return this.list.map(innerArray => innerArray[1].split(',').slice(1).join(','));
    }
}


export class VocabularyList extends Vocabulary {
    constructor(rawSentence = "") {
        super(rawSentence);
        this.meaning = [];
    }

    set addMeaning(meaningSentence) {
        this.meaning = meaningSentence.split('\n').filter(item => item);
    }

    processing() {
        this.makeVocabList().forEach((element, index) => {
            const meaningList = this.meaning;
            this.html += `<div class="row vocabulary">\n`
                      + `   <div class="col-4">・${element}</div>\n`
                      + `   <div class="col-4">\n`
                      + `       <div class="collapse" id="collapse${index}">\n`
                      + `           ${meaningList[index]}\n`
                      + `       </div>\n`
                      + `   </div>\n`
                      + `</div>\n`;
        });
    }
}


export class MultipleChoice extends Vocabulary {
    constructor(rawSentence = "") {
        super(rawSentence);
    }

    processing() {
        const vocabularyList = this.makeVocabList();
        const len = vocabularyList.length;
        const numberOfQuestion = 5;
        
        const randomIndices = getUniqueRandomInt(0, len - 1, numberOfQuestion);

        for (let i = 0; i < numberOfQuestion; i++) {
            const currentIndex = randomIndices[i];
            const targetList = this.list[currentIndex];
            const answerWord = targetList[0];

            let optionIndices = getUniqueRandomInt(0, len - 1, 3, [currentIndex])
            optionIndices.push(currentIndex);

            const option = optionIndices.map(element => vocabularyList[element]);
            const shuffledOption = getUniqueRandomInt(0, 3, 4).map(element => option[element]);

            let questionSentence = `<select id="answer-select${i}" class="form-select d-inline w-auto">\n`
                                 + `    <option value=""></option>\n`;

            shuffledOption.forEach(element => {
                const value = true ? element == answerWord || element == answerWord.toLowerCase(): false;
                questionSentence += `   <option value="${value}">${element}</option>\n`;
            })

            questionSentence += `</select> <span id="result-select${i}"></span>`;

            const pattern = new RegExp([answerWord, answerWord.toLowerCase()].join("|"), "gi");
            const question = `<div class="bottom-space">・\n`
                           + targetList[2].replace(pattern, questionSentence)
                           + `</div>\n`;

            this.html += question;
        }
    }
}


export class FillInTheBlank extends Vocabulary {
    constructor() {
        super();
        this.answerList = [];
    }

    processing() {
        const vocabularyList = this.makeVocabList();
        const len = vocabularyList.length;
        const numberOfQuestion = 5;
        
        const randomIndices = getUniqueRandomInt(0, len - 1, numberOfQuestion);

        for (let i = 0; i < numberOfQuestion; i++) {
            const currentIndex = randomIndices[i];
            const targetList = this.list[currentIndex];
            const answerWord = targetList[0];

            const initial = answerWord.slice(0, 1);
            const latter = answerWord.slice(1);
            this.answerList.push(latter);

            let questionSentence = `<span class="left-space right-space">\n`
                                 + `    <strong>${initial.toLowerCase()}</strong> \n`
                                 + `    <input id="answer-written${i}" type="text" class="form-control form-control-sm d-inline-block fill-in-the-blank">`
                                 + `<span id="result-written${i}"></span>\n`
                                 + `</span>\n`;

            const pattern = new RegExp([answerWord, answerWord.toLowerCase()].join("|"), "gi");
            const question = `・\n`
                           + targetList[2].replace(pattern, questionSentence);

            const hint = this.makeHint()[currentIndex];

            this.html += question 
                      + `<div class="left-space top-space">\n`
                      + `   <strong>Hint: </strong>\n`
                      + hint
                      + `\n</div><br>\n`;
        }
    }
}
