const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()
const list = input.map(l => +l)
const max = 1000000, mod = 1000000009

const dp = new Array(max+1).fill(0)
dp[0] = 0
dp[1] = 1
dp[2] = 2 // 11, 2
dp[3] = 4 // 111, 12,21 ,3
dp[4] = dp[4 - 1] + dp[4 - 2] + dp[4 - 3]

for (let i = 4; i <= max; i++) {
    dp[i] = (dp[i-1] + dp[i-2] + dp[i-3]) % mod
}

let answer = ''
for (let num of list) {
    answer += dp[num] + '\n'
}
console.log(answer.trim())