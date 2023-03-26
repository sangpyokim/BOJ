const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.shift().split(' ').map(Number)

const dp = new Array(N).fill(0)
let answer = 0

for (let i = 0; i < N; i++) {
  dp[i] = 1
  for (let j = 0; j < i; j++) {
    if (list[i] > list[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
  answer = Math.max(answer, dp[i])

}

console.log(answer)