const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(Number)
// ----------------------------
const dp = []
dp[0]= 0
for (let coin of list) {
  dp[coin] = 1
}

for (let i = 1; i <= M; i++) {
  let min = Infinity
  for (let coin of list) {
    if (dp[i - coin] >= 0) {
      min = Math.min(min, dp[i-coin] + 1)
    }
  }
  dp[i] = min
}

console.log(dp[M] === Infinity ? -1 : dp[M])

