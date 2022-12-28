const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))
const start = list[0]
let sum = 0

for (let i = 2; i < N; i++) {
  const cur = list[i]
  const prev = list[i - 1]
  
  const a = (cur[0] - start[0]) * (prev[1] - start[1])
  const b = (cur[1] - start[1]) * (prev[0] - start[0])
  
  sum += (a-b)
}

console.log(Math.abs(sum / 2).toFixed(1))