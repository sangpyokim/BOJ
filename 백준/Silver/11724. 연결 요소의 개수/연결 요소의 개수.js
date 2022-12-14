let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = input.shift().split(' ').map(Number)
const nums = input.map(l => l.split(' ').map(Number))
const par = Array.from({ length: N[0] }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x) 
  x = find(x)
  y = find(y)
  par[y] = x
}

for (let [x, y] of nums) {
  union(x-1, y-1)
}

const set = new Set()
for (let x of par) {
  set.add(find(x))
} 
console.log(set.size)