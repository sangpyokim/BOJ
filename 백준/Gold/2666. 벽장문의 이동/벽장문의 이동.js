const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const [d1, d2] = input.shift().split(' ').map(Number)
const M = +input.shift()
const list = input.map(l => +l)

// ----------------------------

// 왼쪽을 움직이는 경우의수 오른쪽의 경우의수
let answer = Infinity
helper(0, d1, d2, 0)

function helper(L, l, r, sum) {
  if (L === M) return answer = Math.min(answer, sum)

  let cur = list[L]
  const left = Math.abs(l - cur)
  const right = Math.abs(r - cur)
  helper(L + 1, cur, r, sum + left)
  helper(L + 1, l, cur, sum + right)
}

console.log(answer)