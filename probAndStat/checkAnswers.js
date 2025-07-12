/* checkAnswers.js */

const initializeTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

// 問2
document.addEventListener('DOMContentLoaded', function() {
    const question1Button = document.getElementById("question1-button");

    question1Button.addEventListener("click", () => {
        const answerList = [
            "6",
            "4",
            "2",
            "6",
            "9",
            "3",
        ];

        for (let i = 0; i < answerList.length; i++) {
            const writtenElement = document.getElementById(`question1-${i + 1}`);
            const question1Answer = document.getElementById(`question1-${i + 1}-answer`);

            question1Answer.innerHTML = writtenElement.value.trim() === answerList[i]
                ? `<i class="bi bi-circle text-success left-space"></i>`
                : `<i class="bi bi-x-lg text-danger left-space right-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="${answerList[i]}"></i>`;
        }
        
        initializeTooltips();
    });


    const question21Button = document.getElementById("question2-1-button");

    question21Button.addEventListener("click", () => {
        const selected = document.querySelector(`input[name=question2-1]:checked`);
        const question21Answer = document.getElementById(`question2-1-answer`);

        question21Answer.innerHTML = selected.value === "1" 
            ? `<i class="bi bi-circle text-success left-space"></i>`
            : `<i class="bi bi-x-lg text-danger left-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="2."></i>`;

        initializeTooltips();
    });


    const question22Button = document.getElementById("question2-2-button");

    question22Button.addEventListener("click", () => {
        const writtenElement = document.getElementById(`question2-2`);
        const question22Answer = document.getElementById(`question2-2-answer`);

        question22Answer.innerHTML = writtenElement.value.trim() === "3/4"
            ? `<i class="bi bi-circle text-success left-space"></i>`
            : `<i class="bi bi-x-lg text-danger left-space" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="3/4"></i>`;
        
        initializeTooltips();
    });

});
