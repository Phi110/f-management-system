/* vocabulary.js */


import { VocabularyList } from "../module/vocabulary.js";


document.addEventListener('DOMContentLoaded', function() {
    fetch('../../csv/test.e5.csv')
    .then(response => response.text())
    .then(data => parseVersionCSV(data));
});

function parseVersionCSV(data) {
    const v = new VocabularyList();
    v.paragraph = data;
    v.processing();
    const vocabularyList = document.getElementById('vocabulary-list');
    vocabularyList.innerHTML = v.paragraph;
}
