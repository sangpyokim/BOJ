let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');


const [row, col] = input.shift().split(' ').map(Number);

let matrix = input.map(line => line.split('').map(Number))
// ---------------------------------------------------------- //
const dp = Array.from({length: row+1}, () => new Array(col+1).fill(0))
let answer = 0
for (let i = 1; i <= row; i++) {
  for (let j = 1; j <= col; j++) {
    dp[i][j] = matrix[i-1][j-1]
  }
}

for (let i = 1; i <= row; i++) {
  for (let j = 1; j <= col; j++) {
    const top = dp[i-1][j]
    const left = dp[i][j - 1]
    const d = dp[i-1][j-1]
    const cur = dp[i][j]

    if (cur && top !== 0 && left !== 0 && d !== 0) {
      dp[i][j] = 1 + Math.min(top, left, d)
    }
    answer = Math.max(answer, dp[i][j])
  }
}
console.log(answer * answer)