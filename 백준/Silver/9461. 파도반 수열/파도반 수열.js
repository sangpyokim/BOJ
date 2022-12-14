let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const dp = []
dp[0] = 1
dp[1] = 1
dp[2] = 1
dp[3] = 2
dp[4] = 2

const TC = +input.shift()
for (let i = 0; i < TC; i++) {
  const N = +input.shift()

  for (let i = 5; i < N; i++) {
    dp[i] = dp[i-1] + dp[i-5]
  }
  console.log(dp[N-1])
}
