const fs = require('fs');
const input = fs.readFileSync('/home/pavan/repos/advent/day5/input', 'utf-8');
const lines = input.split('\n');
let ans = 0;
let ans2 = 0;

const edges = [];
const sequences = [];
let edgesDone = false;
for(let line of lines){
    if(!edgesDone && line === ""){
        edgesDone = true;
        continue;
    }
    if(edgesDone){
        sequences.push(line.split(",").map(i => Number(i)));
    } else {
        let [s, d] = line.split("|");
        edges.push([Number(s), Number(d)]);
    }
}
for(let seq of sequences){
    const graph = new Map();
    const indegree = new Map();
    for(let [s,d] of edges){
        if(seq.indexOf(s) === -1 || seq.indexOf(d) === -1){
            continue;
        }
        if(!graph.has(s)) graph.set(s, []);
        graph.get(s).push(d);
        if(!indegree.has(s)) indegree.set(s, 0);
        indegree.set(d, (indegree.get(d) || 0) + 1);
    }
    let q = [];
    for(let [k, v] of indegree){
        if(v === 0){
            q.push(k);
        }
    }
    const topo = [];
    while(q.length){
        let cur = q.shift();
        topo.push(cur);
        if(!graph.has(cur)) continue;
        for(let nei of graph.get(cur)){
            indegree.set(nei, (indegree.get(nei) || 1) - 1);
            if(indegree.get(nei) === 0){
                q.push(nei);
            }
        }
    }
    if(seq.join(",") === topo.join(",")){
        ans += seq[Math.floor(seq.length / 2)];
    } else {
        ans2 += topo[Math.floor(topo.length / 2)];
    }
}
console.log(ans, ans2);