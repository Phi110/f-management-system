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

    const checkButton = document.getElementById("check-button");

    checkButton.addEventListener("click", () => {
        for (let i = 0; i < 5; i++) {
            const selectElement = document.getElementById(`answer-select${i}`);
            const selectedValue = selectElement.value;

            const result = document.getElementById(`result${i}`);

            if (selectedValue === "true") {
                result.innerHTML = '<i class="bi bi-check-lg text-success right-space"></i>';
            } else {
                result.innerHTML = '<i class="bi bi-x-lg text-danger right-space"></i>';
            }
        }
        
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
