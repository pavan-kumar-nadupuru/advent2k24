function getNextSpace(i, arr) {
    while (i < arr.length && arr[i] !== ".") {
        i++;
    }
    return i;
}

function getNextFile(i, arr) {
    while (i >= 0 && arr[i] === ".") {
        i--;
    }
    return i;
}

function getCheckSum(arr) {
    let sum = 0;
    arr.map((v, ind) => {
        if (v !== ".") {
            sum += (v * ind);
        }
    });
    return sum;
}

const fs = require("fs");
const line = fs.readFileSync("./input", "utf-8");
// const line = "2333133121414131402";

let id = 0;
let arr = [];
let cur = "file";
for (let c of line) {
    let val = ".";
    if (cur === "file") {
        cur = "space";
        val = "" + id;
        id++;
    } else {
        cur = "file";
    }
    for (let i = 0; i < Number(c); i++) {
        arr.push(val);
    }
}

let l = 0;
let r = arr.length - 1;
while (l <= r) {
    l = getNextSpace(l, arr);
    r = getNextFile(r, arr);
    if (l < r) {
        arr[l] = arr[r];
        arr[r] = ".";
    }
}
console.log(arr.join(""), getCheckSum(arr));















