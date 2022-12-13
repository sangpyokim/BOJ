let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');
const TC = +input.shift()
const max = Math.max(...input)

const dp = []
dp[0] = 1
dp[1] = 1

for (let i = 2; i <= max; i++) {
  dp[i] = dp[i-1] + dp[i-2]
}
for (let i = 0; i < TC; i++) {
  const num = input[i]
  if (num == 0) console.log(1, 0)
  else if (num == 1) console.log(0, 1)
  else console.log(dp[num-2], dp[num-1])
}