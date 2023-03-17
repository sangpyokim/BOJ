const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

let answer = Infinity
function helper(L, a, b, c) {
  if (L === N) {
    if (c >= 1) answer = Math.min(answer, Math.abs(a - b))
    return
  }

  const cur = list[L]
  helper(L + 1, a * cur[0], b + cur[1], c+1)
  helper(L + 1, a, b, c)
}

helper(0, 1, 0, 0)
console.log(answer)