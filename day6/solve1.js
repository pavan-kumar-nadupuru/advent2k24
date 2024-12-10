const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day6/input', 'utf-8');
const lines = input.split('\n');

let ans = 0;
let x, y;

const grid = lines.map(line => line.split(""));
const rows = grid.length;
const cols = grid[0].length;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "^") {
            x = i;
            y = j;
        }
    }
}

grid[x][y] = ".";
let dirMap = new Map();
let N = [-1, 0].join(",");
let S = [1, 0].join(",");
let W = [0, -1].join(",");
let E = [0, 1].join(",");
dirMap.set(N, E);
dirMap.set(E, S);
dirMap.set(S, W);
dirMap.set(W, N);
let curD = N;
const seen = new Set();

while (true) {
    if (grid[x][y] === ".") {
        ans++;
        seen.add(`${x},${y}`);
        grid[x][y] = "X";
    }
    if ((x === 0 && curD === N) || (x === rows - 1 && curD === S) || (y === 0 && curD === W) || (y === cols - 1 && curD === E)) {
        break;
    }
    let [dx, dy] = curD.split(",").map(i => Number(i));
    let nx = x + dx;
    let ny = y + dy;
    if (grid[nx][ny] === "#") {
        curD = dirMap.get(curD);
        continue;
    }
    x = nx;
    y = ny;
}
let positions = [];
for(let s of seen){
    positions.push(s.split(",").map(i => Number(i)));
}
console.log(ans, JSON.stringify(positions));