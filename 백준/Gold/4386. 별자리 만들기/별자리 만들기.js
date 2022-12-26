const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const l = input.map(l => l.split(' ').map(Number))

const par = Array.from({ length: N }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x)
  x = find(x)
  y = find(y)

  par[y] = x
}

const list = []

for (let i = 0; i < N-1; i++) {
  let min = Infinity
  for (let j = i + 1; j < N; j++) {
    const a = l[i]
    const b = l[j]
    
    const c = dist(a, b)
    list.push([i, j, c])
  }
}

list.sort((a,b) => a[2] - b[2])

let cost = 0 
for (let [x, y, w] of list) {
  if (find(x) !== find(y)) {
    union(x, y)
    cost += w*1
  }
}
console.log(cost)

function dist(a1, a2) {
  const a = Math.abs(a1[0] - a2[0])
  const b = Math.abs(a1[1] - a2[1])

  const c = Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 0.5).toFixed(2)
  return c
}

