let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()

const dp = []
dp[0] = 1
dp[1] = 1
dp[2] = 2

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i-1] + dp[i-2]) % 15746
}
console.log(dp[N])

// 1 => 1
// 2 => 11, 00
// 3 => 100, 001, 111
// 4 => 0011, 0000, 1001, 1100, 1111