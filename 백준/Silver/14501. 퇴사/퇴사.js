const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

const dp = new Array(N).fill(0)


for (let i = 0; i < N; i++) {
  const [cur, curCost] = list[i]
  if (cur + i > N) continue
  dp[i] = curCost
  for (let j = i-1; j >= 0; j--) {
    const [prev, prevCost] = list[j]
    const days = prev - i+j
    if (days > 0) continue
    dp[i] = Math.max(dp[i], curCost + dp[j])
  }
}
console.log(Math.max(...dp))