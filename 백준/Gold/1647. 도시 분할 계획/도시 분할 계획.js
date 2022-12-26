const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number);
const list = input.map((i) => i.split(' ').map(Number));

list.sort((a, b) => a[2] - b[2])

const par = Array.from({ length: row + 1 }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x)
  x = find(x)
  y = find(y)

  par[y] = x
}


let cost = 0 
let maxCost = 0
for (let [x, y, w] of list) {
  if (find(x) !== find(y)) {
    union(x, y)
    cost += w
    maxCost = Math.max(maxCost, w)
  }
}
console.log(cost - maxCost)