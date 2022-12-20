let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const A = input.map(l => l.split(' ').map(Number))

A.sort((a,b) => a[0] - b[0])
let dp = new Array(N+1).fill(1)


for (let i = 1; i < N; i++) {
  const cur = A[i]
  let count = 0

  for (let j = 0; j < i; j++) {
    const prev = A[j]
    if (cur[1] > prev[1]) count = Math.max(count, dp[j])
  }
  dp[i] = count + 1
}


console.log(N - Math.max(...dp))