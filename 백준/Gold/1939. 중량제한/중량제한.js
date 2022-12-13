let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [row, col] = input.shift().split(' ').map(Number);
const [start, end] = input.pop().split(' ').map(Number)

let edges = input.map(a => a.split(' '))

// ---------------------------------------------------------- //
edges.sort((a,b) => b[2] - a[2])
const par = Array.from({ length: row + 1 }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x)
  x = find(x)
  y = find(y)
  par[y] = x
}
let totalCost = 0
for (let [x, y, w] of edges) {
  if (find(x) !== find(y)) {
    union(x, y)
    totalCost = w*1
  }
  if (find(start) === find(end)) return console.log(totalCost)
}

console.log(totalCost)

