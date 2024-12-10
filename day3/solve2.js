const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day3/input', 'utf-8');
const lines = input.split('\n');

function checkValid(str) {
    if (str.length > 7) return 0;
    if (str.indexOf(",") == -1) return 0;
    let [n1, n2] = str.split(",");
    let nums = new Set("1234567890".split(""));
    for (let n of n1) {
        if (!nums.has(n)) return 0;
    }
    for (let n of n2) {
        if (!nums.has(n)) return 0;
    }
    let res = Number(n1) * Number(n2);
    if (isNaN(res)) return 0;
    return res;
}

let sum = 0;
let add = true;
for (let line of lines) {
    let i = 0;
    while (i < line.length) {
        if (line[i] !== "m") {
            if(line[i]!=="d"){
                i++;
                continue;
            }
            let two = line.slice(i, i+2+2);
            let five = line.slice(i, i+5+2);
            if(five === "don't()"){
                add = false; 
            } else if(two === "do()"){
                add = true;
            }
            i++;
        }
        if(!add){
            i++;
            continue;
        }
        let start = i;
        while (true) {
            if (line.slice(start, start + 3) !== "mul") break;
            start += 3;
            if (line[start] != "(") break;
            let end = start;
            while (end < line.length && line[end] != ")" && end - start < 9) {
                end++;
            }
            if (end >= line.length || line[end] !== ")") break;
            let pos = line.slice(start + 1, end);
            sum += checkValid(pos);
            break;
        }
        i++;
    }
}
console.log(sum);