/* vocabulary.js */


import { VocabularyList, FillInTheBlank } from "../module/vocabulary.js";


document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        fetch('../../csv/test.v5.csv').then(response => response.text()),
        fetch('../../csv/test.m5.csv').then(response => response.text())
    ])
    .then(([data1, data2]) => {
        parseVocabularyCSV(data1, data2);
    });

    const toggleButton = document.getElementById("toggle-all-button");
    const collapses = Array.from(document.querySelectorAll(".collapse"));
    let isOpen = false;

    toggleButton.addEventListener("click", () => {
        const collapses = Array.from(document.querySelectorAll(".collapse"));
        collapses.forEach(c => {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(c);
            if (isOpen) {
                bsCollapse.hide();
            } else {
                bsCollapse.show();
            }
        });
        isOpen = !isOpen;
    });
});


function parseVocabularyCSV(data1, data2) {
    const v = new VocabularyList();
    v.paragraph = data1;
    v.addMeaning = data2;
    v.processing();
    const vocabularyList = document.getElementById('vocabulary-list');
    vocabularyList.innerHTML = v.paragraph;

    const f = new FillInTheBlank();
    f.paragraph = data1;
    f.processing();
    const fillInTheBlank = document.getElementById('fill-in-the-blank');
    fillInTheBlank.innerHTML = f.paragraph;
}
