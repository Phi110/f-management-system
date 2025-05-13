/* vocabulary.js */


import { VocabularyList, FillInTheBlank } from "../module/vocabulary.js";


document.addEventListener('DOMContentLoaded', function() {
    fetch('../../csv/test.e5.csv')
    .then(response => response.text())
    .then(data => parseVocabularyCSV(data))
});

function parseVocabularyCSV(data) {
    const v = new VocabularyList();
    v.paragraph = data;
    v.processing();
    const vocabularyList = document.getElementById('vocabulary-list');
    vocabularyList.innerHTML = v.paragraph;

    const f = new FillInTheBlank();
    f.paragraph = data;
    f.processing();
    const fillInTheBlank = document.getElementById('fill-in-the-blank');
    fillInTheBlank.innerHTML = f.paragraph;
}
