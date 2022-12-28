const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()

let max = Infinity
let answer = []

function helper(L, num, arr) {
  if (L > max) return
  if (num === 1) {
    max = Math.min(max, L)
    answer = arr
    return
  }

  if (num % 3 === 0) helper(L + 1, num / 3, [...arr, num / 3])
  if (num % 2 === 0) helper(L + 1, num / 2, [...arr, num / 2])
  
  helper(L + 1, num - 1, [...arr, num - 1])


}
helper(0, N, [N])
console.log(max)
console.log(answer.join(' '))