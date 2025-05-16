// Gets the first space that can fit a file of length k in the array
const now = Date.now();
function getFirstSpaceGtK(arr, k) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ".") {
            let size = 0;
            let r = i;
            while (r < arr.length && arr[r] === ".") {
                r++;
                size++;
            }
            if (size >= k) {
                return i;
            }
        }
    }
    return null;
}

// Start from the last and find a file.
// Once you find it, return the file id, start index of file and end index of file.
function getNextFileAndLen(arr, i) {
    i--;
    while (i >= 0 && arr[i] === ".") {
        i--;
    }
    let end = i;
    let id = arr[i];
    while (i >= 0 && arr[i] === id) {
        i--;
    }
    // ID of file, start index, end index (both inclusive). So size is (end - start + 1)
    return [id, i + 1, end];
}

// Calculate the checksum for a given array
function getCheckSum(arr) {
    let sum = 0;
    arr.map((v, ind) => {
        if (v !== ".") {
            sum += (v * ind);
        }
    });
    return sum;
}

// Read input
const fs = require("fs");
const line = fs.readFileSync("./input", "utf-8");
// const line = "2333133121414131402";

let id = 0;
let arr = [];
let cur = "file"; // Start with file and alternate between a space and a file for the entire input string

// Create an array with space (.) and file id (freq times)
for (let c of line) {
    let val = ".";
    if (cur === "file") {
        cur = "space"; // Change to space for next time
        val = "" + id;
        id++;
    } else {
        cur = "file"; // Change to file for next time
    }
    for (let i = 0; i < Number(c); i++) {
        arr.push(val);
    }
}
let r = arr.length;
while (r > 0) {
    // For an index r (exclusive) find the closest file and get its id, start and end indices
    let [fileId, nextR, endOfFile] = getNextFileAndLen(arr, r);
    r = nextR;
    let size = endOfFile - nextR + 1;
    let firstSpace = getFirstSpaceGtK(arr, size);
    if (!firstSpace || firstSpace > r) {
        continue;
    }
    for (let t = 0; t < size; t++) {
        arr[r + t] = ".";
        arr[firstSpace + t] = fileId;
    }
}
console.log(getCheckSum(arr));
console.log(Date.now() - now);