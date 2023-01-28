const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
// ----------------------------

const mod = 10007
const dp = Array.from(Array(N + 1), () => new Array());

dp[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
dp[2] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 3; i <= N; i++) {
  for (let j = 0; j < dp[i - 1].length; j++) {
    const value = [...dp[i - 1]];

    dp[i][j] = value.slice(0, j + 1).reduce((acc, cur) => acc + cur) % mod;
  }
}

console.log(dp[N].reduce((acc, cur) => acc + cur) % mod);