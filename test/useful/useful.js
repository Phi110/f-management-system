/* useful.js */

// 文字数チェッカー
function countString() {
    let input = document.getElementById("count").value;
    let times1 = document.getElementById("times1");
    let times2 = document.getElementById("times2");
    let count = input.length;
    let count2 = input.replace(/[\n\r]/g, '').length;
    times1.innerHTML = `<span class="text-danger left-space">${String(count)}</span>`;
    times2.innerHTML = `<span class="text-danger left-space">${String(count2)}</span>`;
}