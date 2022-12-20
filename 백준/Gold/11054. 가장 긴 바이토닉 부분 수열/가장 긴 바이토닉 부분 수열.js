let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const A = input[0].split(' ').map(Number)




function dynamic(n, nums) {
  const dp = Array.from({length: n}, () => 0)
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

  return dp
}

const dp1 = dynamic(N, A)
const dp2 = dynamic(N, [...A].reverse()).reverse()

let res = 0

for (let i = 0; i < N; i++) {
  A[i]
  const curNum = A[i]
  let max = 0
  for (let j = i + 1; j < N; j++) {
    const nextNum = A[j] || 0
    if (curNum > nextNum) {
      max = Math.max(max, dp2[j])
    }
  }

  res = Math.max(res, dp1[i] + max)
}

console.log(res)