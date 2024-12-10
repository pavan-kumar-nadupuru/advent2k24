const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day4/input', 'utf-8');
const lines = input.split('\n');


const grid = lines.map(line => line.split(""));
const rows = grid.length;
const cols = grid[0].length;
let ans = 0;
const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
];

const valid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
        if(grid[x][y] != "X") continue;
        for(let [dx,dy] of directions){
            let word = "X";
            let [nx, ny] = [x, y];
            while(word.length < 4){
                [nx, ny] = [nx+dx, ny+dy];
                if(!valid(nx, ny)) break;
                word += grid[nx][ny];
            }
            if(word === "XMAS") ans++;
        }
    }
}

console.log(ans);