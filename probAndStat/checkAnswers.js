/* checkAnswers.js */

const initializeTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

function createWrittenQuestion(questionN, answer) {
    const questionButton = document.getElementById(`question${questionN}-button`);

    questionButton.addEventListener("click", () => {
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
    });
}

function createRadioQuestion(questionN, answer) {
    const questionButton = document.getElementById(`question${questionN}-button`);

    questionButton.addEventListener("click", () => {
        const selected = document.querySelector(`input[name=question${questionN}]:checked`);
        const questionAnswer = document.getElementById(`question${questionN}-answer`);

        questionAnswer.innerHTML = selected.value === "1" 
            ? `<i class="bi bi-circle text-success left-space"></i>`
            : `<i class="bi bi-x-lg text-danger left-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title=${answer}></i>`;

        initializeTooltips();
    });
}

function createSelectQuestion(questionN, start, end) {
    const questionButton = document.getElementById(`question${questionN}-button`);

    questionButton.addEventListener("click", () => {
        for (let i = start; i < end + 1; i++) {
        const selected = document.getElementById(`question${questionN}-${i}`);
        const questionAnswer = document.getElementById(`question${questionN}-${i}-answer`);

        questionAnswer.innerHTML = selected.value === "1" 
            ? `<i class="bi bi-circle text-success right-space"></i>`
            : `<i class="bi bi-x-lg text-danger right-space"></i>`;

        }
        
        initializeTooltips();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    createWrittenQuestion("1", ["6", "4", "2", "6", "9", "3"]);

    createRadioQuestion("2-1", "2.");

    createWrittenQuestion("2-2", "3/4");

    createWrittenQuestion("3-1", "-3/4");

    createWrittenQuestion("3-2", "1/2");

    createRadioQuestion("4", "4.");

    createWrittenQuestion("5", "39");

    createWrittenQuestion("6", "0.516");

    createWrittenQuestion("7", ["0.1", "6", "50", "24", "2.015", "4.03", "45.97", "54.03"]);

    createWrittenQuestion("8", ["3.00", "3.00", "0.1", "3", "3.05", "0.03", "0.5", "2.920"]);

    createSelectQuestion("8", 9, 11);
});
