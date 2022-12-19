let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const number = +input.shift()
const mod = 1000000000

const dp = Array.from(new Array(number + 1), () => new Array(10));

dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];

for (let n = 3; n <= number; n++) {
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      dp[n][i] = dp[n - 1][i + 1] % mod;
    } else if (i >= 1 && i <= 8) {
      dp[n][i] = (dp[n - 1][i - 1] + dp[n - 1][i + 1]) % mod;
    } else {
      dp[n][i] = dp[n - 1][i - 1] % mod;
    }
  }
}
let sum = 0;
for (let j = 0; j < 10; j++) {
  sum += dp[number][j];
}

console.log(sum % mod);