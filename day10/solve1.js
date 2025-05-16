let arr = "3 386358 86195 85 1267 3752457 0 741".split(" ");
// let arr = [3];
let m = new Map();
m.set("e", 0);
m.set("o", 0);
m.set("z", 0);
for (let i = 0; i < 75; i++) {
    let nArr = [];
    for (let a of arr) {
        let type;
        if (a === '0') {
            type = "z"
        } else if (a.length % 2 === 0) {
            type = "e"
        } else {
            type = "o";
        }
        if (a === '0') {
            nArr.push('1')
        } {
            let [lh, rh] = [a.slice(0, a.length / 2), a.slice(a.length / 2)];
            nArr.push(lh);
            nArr.push(Number(rh) + '');
        } else {
            nArr.push((Number(a) * 2024) + "");
        }
    }
    console.log(i, arr.length);
    arr = nArr.concat();
}

console.log(arr.length);