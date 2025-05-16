// Get input from file
// function dfs(x, y, seen, path) {
//     if (seen.has(`${x},${y}`)) return;
//     seen.add(`${x},${y}`);
//     if (grid[x][y] === 9) {
//         path.add(`${x},${y}`);
//     }
//     for (let [dx, dy] of directions) {
//         let [nx, ny] = [x + dx, y + dy];
//         if (!inBounds(nx, ny)) continue;
//         if (grid[nx][ny] === grid[x][y] + 1)
//             dfs(nx, ny, seen, path);
//     }
//     seen.delete(`${x},${y}`);
//     return;
// }
const fs = require('fs');
const lines = fs.readFileSync('/home/pavan/repos/advent2k24/day10/input', { encoding: 'utf-8' }).split('\n');
const grid = lines.map(line => line.split("").map(Number));

const rows = grid.length;
const cols = grid[0].length;

let ans = 0;

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const inBounds = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

function bfs(x, y) {
    let count = 0;
    let uniq = new Set();
    let q = [[x, y]];
    while (q.length) {
        let [cx, cy] = q.shift();
        let curP = grid[cx][cy];
        if (curP === 9) {
            uniq.add(`${cx},${cy}`)
            count++;
            continue;
        }
        for (let [dx, dy] of directions) {
            let [nx, ny] = [cx + dx, cy + dy];
            if (!inBounds(nx, ny)) continue;
            let newP = grid[nx][ny];
            if (newP !== curP + 1) continue;
            q.push([nx, ny]);
        }
    }
    ans += uniq.size;
    return count;
}

let tot = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 0) {
            tot += bfs(i, j);
        }
    }
}


console.log(ans, tot);
