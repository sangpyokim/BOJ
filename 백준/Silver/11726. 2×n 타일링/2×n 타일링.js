let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const num = +input[0]
const mod = 10007
const dp = []
dp[0] = 0
dp[1] = 1
dp[2] = 2

for (let i = 3; i <= num; i++) {
  dp[i] = (dp[i - 2] + dp[i-1]) % mod
}
console.log(dp[num])