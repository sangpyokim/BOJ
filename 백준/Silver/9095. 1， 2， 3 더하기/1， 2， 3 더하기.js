const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift(), dp = []
dp[0] = 0
dp[1] = 1
dp[2] = 2
dp[3] = 4

for (let i = 4; i < 11; i++) {
  dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
}

let answer = ''
for (let i = 0; i < TC; i++) {
  const N = +input.shift()
  const res = dp[N]
  answer += res + '\n'
}

console.log(answer.trim())