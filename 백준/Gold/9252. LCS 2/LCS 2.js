const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
let str1 = input[0].split("");
let str2 = input[1].split("");
let stack = [];
let dp = Array.from(Array(input[0].length + 1), () => Array(input[1].length + 1).fill(0));
let row = dp[0].length - 1;
let col = dp.length - 1;

for (let i = 1; i < str1.length + 1; i++) {
  for (let k = 1; k < str2.length + 1; k++) {
    if (str1[i - 1] === str2[k - 1]) {
      dp[i][k] = dp[i - 1][k - 1] + 1;
    } else {
      dp[i][k] = Math.max(dp[i - 1][k], dp[i][k - 1]);
    }
  }
}


while (row > 0 && col > 0) {
  if (dp[col][row] === dp[col - 1][row]) col--;
  else if (dp[col][row] === dp[col][row - 1]) row--;
  else {
    stack.unshift(str1[col - 1]);
    row--;
    col--;
  }
}

console.log(dp[dp.length - 1][dp[0].length - 1]);
console.log(stack.join(""));
