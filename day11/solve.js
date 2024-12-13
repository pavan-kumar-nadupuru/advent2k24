const arr = "3 386358 86195 85 1267 3752457 0 741".split(" ").map(Number);
// const arr = [125, 17];

const memo = new Map();

function dp(num, blinks) {
    const key = `${num},${blinks}`;
    if (memo.has(key)) return memo.get(key);
    if (blinks === 0) {
        return 1;
    }
    let ns = String(num);
    let len = ns.length;
    let res = 0;
    if (num === 0) {
        res = dp(1, blinks - 1);
    } else if (len % 2 === 0) {
        res = dp(Number(ns.slice(0, len / 2)), blinks - 1) + dp(Number(ns.slice(len / 2)), blinks - 1);
    } else {
        res = dp(num * 2024, blinks - 1);
    }
    memo.set(key, res);
    return res;
}

let ans = 0;
const numBlinks = 75;
for (let a of arr) {
    ans += dp(a, numBlinks);
}

console.log(ans, memo.size);