const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()
const list = input.map(l => +l)
const dp = Array.from({length: 100001}, () => new Array(4).fill(0)), mod = 1000000009

dp[1]=[0,1,0,0]
dp[2]=[0,0,1,0]
dp[3] = [0, 1, 1, 1]

for (let i = 4; i <= 100000; i++) {
  dp[i][1] = dp[i - 1][2] + dp[i - 1][3]
  dp[i][2] = dp[i - 2][1] + dp[i - 2][3]
  dp[i][3] = dp[i - 3][1] + dp[i - 3][2]

  dp[i][1]%=mod
  dp[i][2]%=mod
  dp[i][3]%=mod
}
let answer = ''

for (let num of list) {
  answer += (dp[num].reduce((a,b) => a+b) % mod) + '\n'
}
console.log(answer.trim())