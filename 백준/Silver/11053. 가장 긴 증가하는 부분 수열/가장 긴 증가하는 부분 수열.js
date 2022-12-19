let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input.shift()
const nums = input[0].split(' ').map(Number)

const dp = Array.from({length: n+1}, () => 0)
dp[0] = 1
let res = 1

for (let i = 1; i < n; i++) {
  const cur = nums[i]
  
  // 작은 적들중에서 제일 큰거
  let j = i - 1
  let maxIndex = 0
  while (j >= 0) {
    const prev = nums[j]
    if (cur > prev) {
      
      maxIndex = Math.max(maxIndex, dp[j])
    }
    j -= 1
  }
  dp[i] = 1 + maxIndex
  res = Math.max(res, dp[i])
}
console.log(res)