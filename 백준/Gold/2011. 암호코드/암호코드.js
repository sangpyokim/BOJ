const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n")

const str = input.shift().split('').map(Number)
str.unshift(0)
const len = str.length
const dp = new Array(len + 1).fill(0)

dp[0] = 1;
for (let i = 1; i <= len; i++) {

    if (str[i] != 0) {
        dp[i] = (dp[i - 1] + dp[i]) % 1000000;
    }

    let x = str[i] + str[i - 1] * 10;

    if (10 <= x && x <= 26) {
        dp[i] = (dp[i - 2] + dp[i]) % 1000000;
    }
}

console.log(dp[len])