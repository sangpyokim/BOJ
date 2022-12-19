let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input.shift()
const nums = input.map(Number)

const dp = []
dp[0] = 0
dp[1] = nums[0];
dp[2] = nums[0] + nums[1];
for (let i = 3; i <= n; i++) {
  const a = dp[i - 3] + nums[i - 2] + nums[i - 1]
  const b = dp[i - 2] + nums[i - 1]
  const c = dp[i - 1]
  dp[i] = Math.max(a, b, c);
}

console.log(dp[n])
