/* checkAnswers.js */

const initializeTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

function createWrittenQuestion(questionN, answer) {
    if (typeof answer === "string") {
        const writtenElement = document.getElementById(`question${questionN}`);
        const questionAnswer = document.getElementById(`question${questionN}-answer`);

        questionAnswer.innerHTML = writtenElement.value.trim() === answer
            ? `<i class="bi bi-circle text-success left-space"></i>`
            : `<i class="bi bi-x-lg text-danger left-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title=${answer}></i>`;
    } else if (typeof answer === "object") {
        for (let i = 0; i < answer.length; i++) {
            const writtenElement = document.getElementById(`question${questionN}-${i + 1}`);
            const questionAnswer = document.getElementById(`question${questionN}-${i + 1}-answer`);

            questionAnswer.innerHTML = writtenElement.value.trim() === answer[i]
                ? `<i class="bi bi-circle text-success left-space"></i>`
                : `<i class="bi bi-x-lg text-danger left-space right-space" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title=${answer[i]}></i>`;
        }
    }

    initializeTooltips();
}

function createRadioQuestion(questionN, answer) {
    const selected = document.querySelector(`input[name=question${questionN}]:checked`);
    const questionAnswer = document.getElementById(`question${questionN}-answer`);

    questionAnswer.innerHTML = selected.value === "1" 
        ? `<i class="bi bi-circle text-success left-space"></i>`
        : `<i class="bi bi-x-lg text-danger left-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title=${answer}></i>`;

    initializeTooltips();
}


document.addEventListener('DOMContentLoaded', function() {
    const question1Button = document.getElementById("question1-button");
    question1Button.addEventListener("click", () => {
        createWrittenQuestion("1", ["6", "4", "2", "6", "9", "3"]);
    });

    const question21Button = document.getElementById("question2-1-button");
    question21Button.addEventListener("click", () => {
        createRadioQuestion("2-1", "2.");
    });

    const question22Button = document.getElementById("question2-2-button");
    question22Button.addEventListener("click", () => {
        createWrittenQuestion("2-2", "3/4");
    });

    const question7Button = document.getElementById("question7-button");
    question7Button.addEventListener("click", () => {
        createWrittenQuestion("7", ["0.1", "6", "50", "24", "2.015", "4.03", "45.97", "54.03"])
    });

});
