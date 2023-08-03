const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const set = new Set()
let answer = 0
// BT

const BT = (L, cur) => {
  if (set.has(cur)) return
  set.add(cur)

  if (L === N) {
    const num = cur * 1
    const len = String(num).length

    if (num !== 0 && len === N && cur % 3 === 0) {
      answer += 1
    }
    return
  }


  for (let char of ['0', '1', '2']) {
    const next = cur + char

    BT(L + 1, next)
  }

}

BT(0, '')

console.log(answer)