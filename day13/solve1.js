const fs = require('fs');
const lines = fs.readFileSync("/home/pavan/repos/advent2k24/day13/input", "utf-8").split("\n");

let ans = 0;
for (let i = 0; i < lines.length; i += 4) {
    const l1 = lines[i + 0].split(" ");
    const l2 = lines[i + 1].split(" ");
    const l3 = lines[i + 2].split(" ");
    let A = [l1[2].split(",")[0].split("+")[1], l1[3].split("+")[1]].map(Number);
    let B = [l2[2].split(",")[0].split("+")[1], l2[3].split("+")[1]].map(Number);
    let target = [l3[1].split(",")[0].split("=")[1], l3[2].split("=")[1]].map(Number);
    let a = A[0];
    let b = B[0];
    let c = 10000000000000 + target[0];
    let d = A[1];
    let e = B[1];
    let f = 10000000000000 + target[1];
    let x = (((c * e) - (b * f)) / ((a * e) - (b * d)));
    let y = (((a * f) - (c * d)) / ((a * e) - (b * d)));
    if (x > 0 && y > 0 && x === Math.floor(x) && y === Math.floor(y)) {
        ans += (x * 3);
        ans += y;
    }
}
console.log(ans);


// // Button A: X+38, Y+33
// // Button B: X+11, Y+47
// // Prize: X=1461, Y=2879
// let A = [38, 33];
// let B = [11, 47];
// let target = [1461, 2879];

// steps []





// console.log(bt(0, 0, target, [0, 0]));