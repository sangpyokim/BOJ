const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))
list.push([0, 0])

const dp = new Array(1500001).fill(0)
let max = 0

for (let i = 0; i <= N; i++) {
  max = Math.max(max, dp[i]);

  if (list[i][0] + i > N) continue
  
  dp[i + list[i][0]] = Math.max(max + list[i][1], dp[i + list[i][0]])
  
}

console.log(max)