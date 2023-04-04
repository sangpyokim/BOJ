const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()

const dp = [], mod = 9901

dp[0] = 1;
dp[1] = 3;
for (let i = 2; i <= N; i++){
    dp[i] = (dp[i - 2] + dp[i - 1] * 2) % mod
}
console.log(dp[N])
