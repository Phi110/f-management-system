/* vocabulary.js (module) */



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
}


export class VocabularyList extends Vocabulary {
    constructor(rawSentence = "") {
        super(rawSentence);
    }

    processing() {
        this.makeVocabList().forEach(element => {
            this.html +=`・${element}<br>`;
        });
    }
}


export class FillInTheBlank extends Vocabulary {
    constructor(rawSentence = "") {
        super(rawSentence);
    }

    processing() {
        const vocabularyList = this.makeVocabList();
        const len = vocabularyList.length;
        const numberOfQuestion = 5;
        
        const randomIndices = getUniqueRandomInt(0, len - 1, numberOfQuestion);

        for (let i = 0; i < numberOfQuestion; i++) {
            const currentIndex = randomIndices[i]
            const targetList = this.list[currentIndex];
            const answerWord = targetList[0];

            let optionIndices = getUniqueRandomInt(0, len - 1, 3, [currentIndex])
            optionIndices.push(currentIndex);

            const option = optionIndices.map(element => vocabularyList[element]);
            const shuffledOption = getUniqueRandomInt(0, 3, 4).map(element => option[element]);

            let questionSentence = `<select class="form-select d-inline w-auto">
                    <option value=""></option>\n`;

            shuffledOption.forEach(element => {
                const value = true ? element == answerWord || element == answerWord.toLowerCase(): false;
                questionSentence += `<option value="${value}">${element}</option>\n`;
            })

            questionSentence += `</select> <span id="result${i}"></span>`;

            const pattern = new RegExp([answerWord, answerWord.toLowerCase()].join("|"), "gi");
            const question = '・' + targetList[2].replace(pattern, questionSentence);

            this.html += question + '<br>';
        }
    }
}

const v = new FillInTheBlank();
v.paragraph = `A
Adhere
Verb, To stick firmly to a rule, agreement, or belief. 

All employees must adhere to the company’s confidentiality policy.

C
Coerce
Verb, To persuade someone to do something by using force or threats.

The contract was signed under pressure and might be considered coerced.

Contingent
Adj., Dependent on certain conditions.

The bonus is contingent on meeting quarterly sales targets.

Credence
Noun, Belief in or acceptance of something as true.

His research lends credence to the theory of market fluctuation.

D
Deficit
Noun, The amount by which something, especially money, is too small.

The country is facing a growing trade deficit.

F
Feasible
Adj., Possible and practical to do easily or conveniently.

The proposal was deemed feasible after a cost analysis.

I
Incentivize
Verb, To provide someone with a reason or motivation to do something.

The company incentivizes good performance with quarterly bonuses.

M
Mandate
Noun, An official order or authorization to act.

The agency received a mandate to regulate digital advertising.

N
Negligible
Adj., So small or unimportant as to be not worth considering.

The error had a negligible effect on the final report.

O
Oversee
Verb, To supervise or manage a process or group.

She was hired to oversee the implementation of new HR policies.

P
Preliminary
Adj., Coming before the main event or action.

These are just preliminary results; more analysis is needed.

R
Reimburse
Verb, To pay back money that has been spent or lost.

Employees will be reimbursed for approved travel expenses.

Remedy
Noun, A means of solving a problem or correcting a fault.

Management proposed a remedy for the budget shortfall.

T
Tentative
Adj., Not certain or fixed; provisional.

The schedule is tentative and may be revised later.

U
Undermine
Verb, To weaken or damage something gradually or secretly.

Rumors about layoffs may undermine employee morale.
`;
v.processing();
//console.log(v.paragraph);
