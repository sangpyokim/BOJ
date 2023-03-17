const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const K = +input.shift()
const list = input.map(l => l.split(' ').map(Number))


const dp = Array.from({length: N+1}, () => 0)
dp[0] = 1

for (let [coin, count] of list) {
  for (let j = N; j >= 0; j--) {
    for (let k = 1; k <= count && j - coin * k >= 0; k++) {
      dp[j] += dp[j - coin * k]
    }
  }
}

console.log(dp[N])