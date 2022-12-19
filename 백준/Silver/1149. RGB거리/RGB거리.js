let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

const dp = Array.from({ length: N+1 }, () => new Array(3))
dp[0][0] = 0
dp[0][1] = 0
dp[0][2] = 0
for (let i = 1; i <= N; i++) {
  for (let j = 0; j < 3; j++) {
    const cur = list[i - 1][j]
    const next1 = (j + 4) % 3
    const next2 = (j + 5) % 3
    const prev1 = dp[i-1][next1] // 0 -> 1, 2 -> 3 - 0 - 1 
    const prev2 = dp[i - 1][next2] // 1 -> 0, 2
    dp[i][j] = cur + Math.min(prev1, prev2)
  }


}
console.log(Math.min(...dp[N]))
