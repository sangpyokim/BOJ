const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.shift().split(' ').map(Number)
list.unshift(0)
const dp = []
dp[0] = list[0]
dp[1] = list[1]

for (let i = 2; i <= N; i++) {
  let max = list[i], diff = 0

  for (let j = i; j >= 1; j--) {
    max = Math.min(max, list[j] + dp[diff])

    diff += 1
  }

  dp[i] = max
}
console.log(dp[N])