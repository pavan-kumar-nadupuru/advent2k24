const fs = require("fs");
const lines = fs.readFileSync("/home/pavan/repos/Personal/advent2k24/day12/input", "utf-8").split("\n");

const grid = lines.map(line => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const seen = new Set();

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1],]; // N, E, S, W
const inBounds = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

function bfs(x, y) {
    let q = [[x, y]];
    seen.add(`${x},${y}`);
    let area = 1;
    let peri = 0;
    let c = grid[x][y]
    while (q.length) {
        let [cx, cy] = q.shift();
        let round = []; // N, E, S, W
        for (let [dx, dy] of directions) {
            let [nx, ny] = [cx + dx, cy + dy];
            if (!inBounds(nx, ny)) {
                round.push(true);
                continue;
            }
            if (grid[nx][ny] != c) {
                round.push(true);
                continue;
            }
            round.push(false);
            if (seen.has(`${nx},${ny}`)) continue;
            q.push([nx, ny]);
            seen.add(`${nx},${ny}`);
            area++;
        }
        const diag = [[-1, 1], [1, 1], [1, -1], [-1, -1]]; // NE, SE, SW, NW
        for (let i = 0; i < 4; i++) {
            if (round[i] && round[(i + 1) % 4]) peri++;
            let [dix, diy] = [cx + diag[i][0], cy + diag[i][1]]; // Check for normal corners 
            if (!round[i] && !round[(i + 1) % 4] && inBounds(dix, diy) && grid[dix][diy] !== c) peri++; // Check for concave corners
        }
        // if (round[0] && round[1]) peri += 1;
        // if (round[1] && round[2]) peri += 1;
        // if (round[2] && round[3]) peri += 1;
        // if (round[3] && round[0]) peri += 1;
        // if (!round[0] && !round[1] && inBounds(cx - 1, cy + 1) && grid[cx - 1][cy + 1] !== c) {
        //     peri += 1;
        // }
        // if (!round[1] && !round[2] && inBounds(cx + 1, cy + 1) && grid[cx + 1][cy + 1] !== c) {
        //     peri += 1;
        // }
        // if (!round[2] && !round[3] && inBounds(cx + 1, cy - 1) && grid[cx + 1][cy - 1] !== c) {
        //     peri += 1;
        // }
        // if (!round[3] && !round[0] && inBounds(cx - 1, cy - 1) && grid[cx - 1][cy - 1] !== c) {
        //     peri += 1;
        // }

    }
    return [area, peri];
}

let ans = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (!seen.has(`${i},${j}`)) {
            const [area, peri] = bfs(i, j);
            console.log(`Char '${grid[i][j]} at (${i}, ${j}) : Area (${area}) and peri is ${peri}`);
            ans += (area * peri);
        }
    }
}
console.log(ans);