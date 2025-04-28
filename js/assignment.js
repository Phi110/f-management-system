/* assignment.js */

// 課題
import { Assignment } from "../module/assignment.js";

document.addEventListener('DOMContentLoaded', function() {
    fetch('./csv/assignment.csv')
    .then(response => response.text())
    .then(data => parseCSV(data));
});

const a = new Assignment();

function parseCSV(data) {
    const lines = data.split('\n');
    
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');

        if (cols.length < 5) continue;

        a.add(cols[0].trim(), cols[1].trim(), cols[2].trim(), cols[3].trim(), cols[4].trim());
    }

    let newTable = a.to_table;
    let assignmentTable = document.getElementById(`assignment-table`);
    assignmentTable.innerHTML = newTable;
}
