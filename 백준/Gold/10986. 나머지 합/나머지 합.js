let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input.shift().split(' ').map(Number)
const arr = input[0].split(' ').map(Number)

const mod = new Array(1001).fill(0)
mod[0] = 1

let sum = 0
let res = 0

for (let i = 0; i < n; i++) {
  sum += arr[i];
  sum %= m;

  mod[sum] ? mod[sum] += 1 : mod[sum] = 1
}

for (let i = 0; i < m; i++) {
  res += Math.floor(mod[i] * (mod[i]-1) / 2)
}

console.log(res)