const fs = require("fs");
const lines = fs.readFileSync("/home/pavan/repos/Personal/advent2k24/day12/input", "utf-8").split("\n");

const grid = lines.map(line => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const seen = new Set();

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const inBounds = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

function bfs(x, y) {
    let q = [[x, y]];
    seen.add(`${x},${y}`);
    let peri = 0;
    let area = 1;
    let c = grid[x][y]
    while (q.length) {
        let [cx, cy] = q.shift();
        for (let [dx, dy] of directions) {
            let [nx, ny] = [cx + dx, cy + dy];
            if (!inBounds(nx, ny)) {
                peri += 1;
                continue;
            }
            if (grid[nx][ny] != c) {
                peri += 1;
                continue;
            }
            if (seen.has(`${nx},${ny}`)) continue;
            q.push([nx, ny]);
            seen.add(`${nx},${ny}`)
            area++;
        }
    }
    console.log(x, y, area, peri)
    return [area, peri];
}

let ans = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (!seen.has(`${i},${j}`)) {
            const [area, peri] = bfs(i, j);
            ans += (area * peri);
        }
    }
}
console.log(ans);