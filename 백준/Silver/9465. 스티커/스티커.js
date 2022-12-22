let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const TC = +input.shift()
let answer = ''

for (let i = 0; i < TC; i++) {
  const N = +input.shift()
  const arr = [input.shift().split(' ').map(Number), input.shift().split(' ').map(Number)]

  const res = solution(N, arr)
  answer += res + '\n'
}
console.log(answer.trim())
function solution(n, arr) {
  const dp = Array.from({ length: n+1 }, () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = 0
  dp[1][0] = arr[0][0];
  dp[1][1] = arr[1][0];  

  for (let i = 2; i <= n; i++) {    
    dp[i][0] = Math.max(dp[i-1][1], dp[i-2][1]) + arr[0][i-1]*1;
    dp[i][1] = Math.max(dp[i-1][0], dp[i-2][0]) + arr[1][i-1]*1;
  }  
  return Math.max(...dp[n]);
}

