/* vocabulary.js */


import { VocabularyList, MultipleChoice, FillInTheBlank } from "../module/vocabulary.js";


let answerList;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('i');

    Promise.all([
        fetch(`./vocabulary.csv/vocabulary${index}.csv`).then(response => response.text()),
        fetch(`./meaning.csv/meaning${index}.csv`).then(response => response.text())
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

    const multipleChoiceButton = document.getElementById("multiple-choice-button");

    multipleChoiceButton.addEventListener("click", () => {
        let correctCount = 0;
        for (let i = 0; i < 5; i++) {
            const selectElement = document.getElementById(`answer-select${i}`);
            const selectedValue = selectElement.value;

            const result = document.getElementById(`result-select${i}`);

            if (selectedValue === "true") {
                result.innerHTML = '<i class="bi bi-check-lg text-success right-space"></i>';
                correctCount++;
            } else {
                result.innerHTML = '<i class="bi bi-x-lg text-danger right-space"></i>';
            }
        }
        const correctRate = Math.floor(correctCount / 5 * 100);
        const mark = correctRate >= 50 ? "bi-circle text-success": "bi-x-lg text-danger";

        const score = document.getElementById(`multiple-choice-score`);
        score.innerHTML = `<span class="fill-in-the-blank">\n`
                        + `    <i class="bi ${mark} right-space left-space"></i>`
                        + `<strong>${correctCount}</strong> out of 5 questions `
                        + `( <strong>${correctRate}</strong> %) correct\n`
                        + `</span>\n`;
    });

    const fillInTheBlankButton = document.getElementById("fill-in-the-blank-button");

    fillInTheBlankButton.addEventListener("click", () => {
        let correctCount = 0;
        for (let i = 0; i < 5; i++) {
            const writtenElement = document.getElementById(`answer-written${i}`);
            const selectedValue = writtenElement.value;

            const result = document.getElementById(`result-written${i}`);

            if (selectedValue === answerList[i]) {
                result.innerHTML = '<i class="bi bi-check-lg text-success right-space"></i>';
                correctCount++;
            } else {
                result.innerHTML = '<i class="bi bi-x-lg text-danger right-space"></i>';
            }
        }
        const correctRate = Math.floor(correctCount / 5 * 100);
        const mark = correctRate >= 50 ? "bi-circle text-success": "bi-x-lg text-danger";

        const score = document.getElementById(`fill-in-the-blank-score`);
        score.innerHTML = `<span class="fill-in-the-blank">\n`
                        + `    <i class="bi ${mark} right-space left-space"></i>`
                        + `<strong>${correctCount}</strong> out of 5 questions `
                        + `( <strong>${correctRate}</strong> %) correct\n`
                        + `</span>\n`;
    });
});


function parseVocabularyCSV(data1, data2) {
    const v = new VocabularyList();
    v.paragraph = data1;
    v.addMeaning = data2;
    v.processing();
    const vocabularyList = document.getElementById('vocabulary-list');
    vocabularyList.innerHTML = v.paragraph;

    const m = new MultipleChoice();
    m.paragraph = data1;
    m.processing();
    const multipleChoice = document.getElementById('multiple-choice');
    multipleChoice.innerHTML = m.paragraph;

    const f = new FillInTheBlank();
    f.paragraph = data1;
    f.processing();
    answerList = f.answerList;
    const fillInTheBlank = document.getElementById('fill-in-the-blank');
    fillInTheBlank.innerHTML = f.paragraph;
}
