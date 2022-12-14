let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const l = +input.shift()
const cost = input.map(Number)

const dp = []

dp[0] = cost[0]
if (!cost[1]) cost[1] = 0
if (!cost[2]) cost[2] = 0 
dp[1] = Math.max(cost[0] + cost[1], cost[2])
dp[2] = Math.max(cost[0] + cost[2], cost[1] + cost[2])

for (let i = 3; i < l; i++) {
  dp[i] = Math.max(dp[i-2] + cost[i], dp[i-3] + cost[i] + cost[i-1]);

}  

console.log(dp[l-1])