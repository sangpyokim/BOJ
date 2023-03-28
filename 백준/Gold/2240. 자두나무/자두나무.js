const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [T, W] = input.shift().split(' ').map(Number)
const A = input.map(l => +l)

// 각 차원의 0번째 인덱스는 padding
const dp = [...Array(2)].map(() =>
  [...Array(T + 1)].map(() => Array(W + 2).fill(0))
);

for (let i = 1; i <= T; i++) {
  for (let j = 1; j <= W + 1; j++) {
    // 자두가 0번 자두나무에 떨어질 경우
    if (A[i - 1] == 1) {
      dp[0][i][j] = Math.max(dp[0][i - 1][j] + 1, dp[1][i - 1][j - 1] + 1);
      dp[1][i][j] = Math.max(dp[0][i - 1][j - 1], dp[1][i - 1][j]);
    }
    // 자두가 1번 자두나무에 떨어질 경우
    else {
      if (i == 1 && j == 1) continue;
      dp[0][i][j] = Math.max(dp[0][i - 1][j], dp[1][i - 1][j - 1]);
      dp[1][i][j] = Math.max(dp[0][i - 1][j - 1] + 1, dp[1][i - 1][j] + 1);
    }
  }
}

let ans = 0;
for (let i = 0; i <= W + 1; i++) {
  ans = Math.max(dp[0][T][i], dp[1][T][i]);
}

// console.log(dp);
console.log(ans);