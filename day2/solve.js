const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8');
const lines = input.split('\n');

const reports = lines.map(line => line.split(" ").map(i => Number(i)));


const posDiff = new Set([1, 2, 3]);
const negDiff = new Set([-1, -2, -3]);

function isSafe(report) {
    let n = report.length;
    let use = posDiff;
    if (report[0] < report[1]) {
        use = negDiff
    }
    for (let i = 0; i < n - 1; i++) {
        if (!use.has(report[i] - report[i + 1])) {
            return false;
        }
    }
    return true;
}
function countSafe(reports) {
    let ans = 0;
    for (let report of reports) {
        if (isSafe(report)) ans++;
    }
    return ans;
}

function countSafe2(reports) {
    let ans = 0;
    for (let report of reports) {
        let good = false;
        for (let i = 0; i < reports.length; i++) {
            if(isSafe(report.slice(0, i).concat(report.slice(i+1)))){
                good = true;
                break;
            }
        }
        if (good) ans++;
    }
    return ans;
}

console.log(countSafe2(reports));