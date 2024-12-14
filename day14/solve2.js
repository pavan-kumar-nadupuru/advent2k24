const fs = require("fs");
const { createCanvas } = require("canvas");

const lines = fs.readFileSync("/home/pavan/repos/advent2k24/day14/input", "utf-8").split("\n");
const maxX = 101;
const maxY = 103;
const midX = Math.ceil(maxX / 2) - 1;
const midY = Math.ceil(maxY / 2) - 1;

// Create output directory if it doesn't exist
const outputDir = "./output_images";
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to save array as PNG
function saveArrayAsPNG(arr, index) {
    const cellSize = 8; // Size of each cell in pixels
    const width = maxX * cellSize;
    const height = maxY * cellSize;

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Fill background (optional)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Draw cells
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (arr[y][x] === 1) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    // Save to file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`${outputDir}/${index + 1}.png`, buffer);
}

// Main loop
for (let i = 0; i < 10000; i++) {
    if (i !== 7861) continue;  // YAYYYY!
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
        arr[fy][fx] = 1;

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

    // Save the current array as PNG
    saveArrayAsPNG(arr, i);

    arr.map(row => {
        console.log(row.join(""));
    });
}