const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

// ----------------------------
const par = Array.from({ length: N }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x)
  x = find(x)
  y = find(y)
  par[y] = x
}
const arr = []
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i!==j) arr.push([i, j, list[i][j]])
  }
}
arr.sort((a, b) => a[2] - b[2])

let answer = 0
for (let [x, y, w] of arr) {
  if (find(x) !== find(y)) {
    union(x, y)
    answer += w
  }
}
console.log(answer)