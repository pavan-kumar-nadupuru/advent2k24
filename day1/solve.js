const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8');
const lines = input.split('\n');

let l = [];
let r = [];
for (let line of lines) {
    let temp = line.split("   ").map(a => Number(a));
    l.push(temp[0]);
    r.push(temp[1]);
}

function first() {
    l.sort((a, b) => a - b);
    r.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < l.length; i++) {
        console.log(l[i], r[i])
        ans += Math.abs(l[i] - r[i]);
    }
    return ans;
}

function second(){
    let c = new Map();
    for(let i of r){
        c.set(i, (c.get(i) || 0) + 1);
    }
    let ans = 0;
    for(let i of l){
        ans += (i * (c.get(i) || 0))
    }
    return ans
}



console.log(first());
console.log(second());