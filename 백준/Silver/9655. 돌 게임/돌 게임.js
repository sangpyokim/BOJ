const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const dp = new Array(N+1).fill(0)

dp[0] = 1
dp[1] = 1
dp[2] = 0
dp[3] = 1

for (let i = 4; i <= N; i++) {
    dp[i] = 0
    const a = 1 - dp[i - 1]
    const b = 1 - dp[i - 3]
    if (a || b) dp[i] = 1
}
if (dp[N]) console.log('SK')
else console.log('CY')
