const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift()
const list = input.shift().split(' ').map(Number)
const len = list.length

let dp = Array.from({ length: N }, () => 0);
let arr = [];

for (let i = 0; i < N; i++) {
  let max = 0;
  let maxIdx = -1;
  for (let j = 0; j < i; j++) {
    if (list[i] > list[j] && dp[j] > max) {
      max = dp[j];
      maxIdx = j;
    }
  }
  dp[i] = max + 1;
  arr[i] = maxIdx !== -1 ? arr[maxIdx].concat(list[i]) : [list[i]];
}
let answer = Math.max(...dp);

console.log(answer);
console.log(arr[dp.indexOf(answer)].join(" "));