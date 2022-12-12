// /dev/stnin
// 한 줄 입력
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

let num = Number(input);


const dp = []
dp[0] = 0
dp[1] = 0
dp[2] = 1
dp[3] = 1

for (let i = 4; i <= num; i++) {
  if (isThree(i) && isTwo(i)) {
    const three = i / 3
    const two = i / 2
    dp[i] = 1 + Math.min(dp[i-1], dp[two], dp[three])
  }
  else if (isThree(i)) {
    const three = i / 3
    dp[i] = 1 + Math.min(dp[i-1], dp[three])
  }
  else if (isTwo(i)) {
    const two = i / 2
    dp[i] = 1 + Math.min(dp[i-1], dp[two])
  } else {
    dp[i] = 1 + dp[i-1]
  }
}

console.log(dp[num])

function isThree(num) {
  return num % 3 === 0
}

function isTwo(num) {
  return num % 2 === 0
}