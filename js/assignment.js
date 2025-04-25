/* assignment.js */

// 課題
import { Assignment } from '../module/assignment.js';

const a = new Assignment();



a.add("4/24", "自然言語処理", "共起ネットワーク図", "https://forms.office.com/r/XtM8PxW17n", 6);
a.add("4/28", "人工知能数学", "復習問題３", "https://lms-tokyo.iput.ac.jp/mod/assign/view.php?id=80860", 15);
a.add("4/28", "人工知能数学", "演習問題３", "https://lms-tokyo.iput.ac.jp/mod/assign/view.php?id=80861", 16);
a.add("4/29", "AIシステム開発", "第４回個人課題", "https://lms-tokyo.iput.ac.jp/mod/assign/view.php?id=80691", 14);
a.add("5/8", "データベース", "練習 (6)-(9)", "", 17)



let newTable = a.to_table;

let assignmentTable = document.getElementById(`assignment-table`);
assignmentTable.innerHTML = newTable;