const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const M = +input.shift()
const max = 41

const dp = Array.from({ length: N + 1 }, () => 1)

dp[0] = 1
dp[1] = 1
dp[2] = 2

for (let i = 3; i <= N; i++) {
    dp[i] = dp[i-1] + dp[i-2]
}
if (M === 0) return console.log(dp[N])
let prev = 0, answer = 1
for (let i = 0; i < M; i++) {
    const num = input[i]
    answer *= dp[num - prev - 1]
    prev = num
}
console.log(answer * dp[N - input[M-1]])