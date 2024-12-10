const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day8/input', 'utf-8');
const lines = input.split('\n');

const grid = lines.map(line => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

let antinodes = new Set();

let counter = new Map();
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const location = `${i},${j}`;
        const freq = grid[i][j];
        if (freq === ".") continue;
        if (!counter.has(freq)) counter.set(freq, []);
        counter.get(freq).push(location);
    }
}
const valid = (x, y) => (x >= 0 && y >= 0 && x < rows && y < cols);
for (let [_, locations] of counter) {
    if (locations.length < 2) continue;
    for (let i = 0; i < locations.length; i++) {
        let [fx, fy] = locations[i].split(",").map(i => Number(i));
        for (let j = 0; j < locations.length; j++) {
            if (i === j) continue;
            let [sx, sy] = locations[j].split(",").map(i => Number(i));
            let [dx, dy] = [fx - sx, fy - sy];
            let [px, py] = [sx, sy];
            while(valid(px, py)){
                antinodes.add(`${px},${py}`);
                [px, py] = [px - dx, py - dy];
            }
        }
    }
}

console.log(antinodes.size);
