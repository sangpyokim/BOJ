const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.shift().split(' ').map(Number)

list.sort((a, b) => a - b)

let answer = 0

list.forEach((v, i) => binarySearch(i, 0, N-1) && (answer += 1) )
console.log(answer)

function binarySearch(i, left, right) {
  const target = list[i]
  while (left < right) {
    if (left === i) {
      left++
      continue
    }
    if (right === i) {
      right--
      continue
    }

    const sum = list[left] + list[right]
    if (target === sum) return true

    if (target < sum) {
      right--
    } else {
      left++
    }
  }

  return false
}
