const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day7/input', 'utf-8');
const lines = input.split('\n');


let ans = 0;
for (line of lines) {
    let [tar, vals] = line.split(": ");
    tar = Number(tar);
    vals = vals.split(" ").map(i => Number(i));
    function bt(i, cur) {
        if (i === vals.length) {
            if (cur === tar) {
                return true
            }
            return false;
        }
        if (bt(i + 1, cur * vals[i]) || bt(i + 1, cur + vals[i]) || bt(i+1, Number("" + cur + "" + vals[i]))) return true;
        return false;
    }
    if (bt(1, vals[0])) {
        ans += tar;
    }
}
console.log(ans);