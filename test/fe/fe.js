/* fe.js */


class feKeywords {
    constructor(rawSentence = "") {
        this.rawSentence = rawSentence;
        this.contents = {};
        this.html = "";
    }

    set paragraph(rawSentence) {
        this.contents = this.splitToObject(rawSentence);
        this.contents["date"] = this.makeDate(this.contents["date"].split(','));
        this.toHTML();
    }

    splitToObject(str) {
        const parts = str.split("\n\n");
        const obj = {};
        parts.forEach(elements => {
            const [former, ...latter] = elements.split('\n');
            obj[former] = latter.join('') ?? null;
        });

        return obj;
    }

    makeDate(letters) {
        const dates = letters.map(letter => {
            const digitalLetter = letter.length === 1 ? '0' + letter: letter;

            return digitalLetter;
        });

        return `Ver. 2025.${dates[0]}.${dates[1]}. 伊東颯紀`;
    }

    makeLink(id, value) {
        function toJapanese(season) {
            if (season === "haru") {
                return "春";
            } else if (season === "aki") {
                return "秋";
            } else {
                return season;
            }
        }
        function addEraName(year) {
            if (Number(year) >= 16) {
                return `平成${year}`;
            } else {
                return `令和${year}`;
            }
        }

        const parts = value.split(',');
        let html = "";
        parts.forEach(element => {
            const urls = element.split('/');
            const season = urls[4].split('_');
            const question = urls[5].split('.');

            const phrase = `${addEraName(season[0])}年${toJapanese(season[1])}期 午前問${question[0].slice(1)}`;
            html += `・<a href=${element} target="_blank">${phrase}</a><br>`;
        });
        
        id.innerHTML = html;
    }

    arrange(sentence) {
        const parts = sentence.split(',');
        
        let doneSentence = `<span class="left-space"></span>`;
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === "") {
                doneSentence += `<br><span class="left-space"></span>`;
            } else if (parts[i] === "red") {
                i++;
                doneSentence += ` <span class="text-danger">${parts[i]}</span> `;
            } else if (parts[i] === "image") {
                i++;
                doneSentence += `<img src="./images/${parts[i]}.webp" class="raid">`
            } else if (parts[i].slice(0, 1) === "・") {
                doneSentence += `<br><br><h4>${parts[i]}</h5>`;
            } else if (parts[i] === "block") {
                doneSentence += `<br>`;
            } else {
                doneSentence += parts[i];
            }
        }
        console.log(doneSentence);

        return doneSentence;
    }

    toHTML() {
        Object.entries(this.contents).forEach(([key, value]) => {
            const id = document.getElementById(key);
            switch (true) {
                case key === "fe" || key === "ap":
                    console.log(id, value);
                    this.makeLink(id, value);
                    break;

                case key === "date" || key === "title":
                    id.innerHTML = value;
                    break;

                default:
                    id.innerHTML = this.arrange(value);
                    break;
            }
        });

        for (let i = 0; i < 2; i++) {
            const breadCrumbs = document.getElementById(`current-page-${i}`)
            breadCrumbs.innerHTML = this.contents["title"];
        }
        
    }
}



function feCSV(data) {
    const test = new feKeywords();
    test.paragraph = data;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    fetch(`./keywords/${page}.csv`)
    .then(response => response.text())
    .then(data => feCSV(data));

});
