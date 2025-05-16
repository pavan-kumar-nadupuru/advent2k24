const fs = require("fs");
const lines = fs.readFileSync("/home/pavan/repos/advent2k24/day14/input", "utf-8").split("\n");

const maxX = 101;
const maxY = 103;


const midX = Math.ceil(maxX / 2) - 1;
const midY = Math.ceil(maxY / 2) - 1;


for (let i = 0; i < 10000000; i++) {
    const arr = Array.from({ length: maxY }, () => Array.from({ length: maxX }, () => "."));
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;
    for (let line of lines) {
        let [p, v] = line.split(" ");
        p = p.split("=")[1];
        v = v.split("=")[1];
        p = p.split(",").map(Number);
        v = v.split(",").map(Number);


        const [cx, cy] = p;
        const [dx, dy] = v;

        let nx = (cx + (dx * i)) % maxX;
        let ny = (cy + (dy * i)) % maxY;

        let [fx, fy] = [nx < 0 ? maxX + nx : nx, ny < 0 ? maxY + ny : ny];
        if (arr[fy][fx] === ".") arr[fy][fx] = 1;
        else arr[fy][fx] += 1;

        if (fy < midY) {
            if (fx < midX) {
                q1++;
            } else if (fx > midX) {
                q4++;
            }
        } else if (fy > midY) {
            if (fx < midX) {
                q2++;
            } else if (fx > midX) {
                q3++;
            }
        }
    }
    for (let i = 0; i < maxY; i++) {
        arr[i][midX] = " ";
    }
    for (let i = 0; i < maxX; i++) {
        arr[midY][i] = " ";
    }
    console.log(q1 * q2 * q3 * q4);
    arr.map(i => {
        console.log(i.join(" "))
    });
}

