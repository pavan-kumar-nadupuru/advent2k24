const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day4/input', 'utf-8');
const lines = input.split('\n');


const grid = lines.map(line => line.split(""));
const rows = grid.length;
const cols = grid[0].length;
let ans = 0;
const directions = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
];

const valid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;
let help = {
    "M": 2,
    "A": 1,
    "S": 3
}
for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
        if (grid[x][y] != "A") continue;
        let canForm = true;
        for (let [dx, dy] of directions) {
            if (!valid(x + dx, y + dy)) {
                canForm = false;
                break;
            }
        }
        if (!canForm) continue;
        let one = [grid[x + 1][y + 1], grid[x][y], grid[x - 1][y - 1]].sort((a, b) => help[a] - help[b]).join("");
        let two = [grid[x - 1][y + 1], grid[x][y], grid[x + 1][y - 1]].sort((a, b) => help[a] - help[b]).join("");
        if (one === "AMS" && two === "AMS") ans++;
    }
}

console.log(ans);