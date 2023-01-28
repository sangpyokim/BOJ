const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input[0].split(' ').map(Number)
// ----------------------------

let left = 0, right = Math.max(...list)
let answer = 0

while (left < right) {
  const mid = Math.floor((right + left) / 2) // 나무 자를 높이

  const res = getTree(mid) // 나무의 개수

  if (left === right) return console.log(left)

  if (res < M) {
    right = mid
  } else {
    answer = Math.max(answer, mid)
    left = mid + 1
  }
}

console.log(answer)

function getTree(mid) {
  let res = 0

  for (let num of list) {
    const sum = num - mid
    if (sum >= 0n) res += sum 
  }

  return res
}