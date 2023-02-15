const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input[0].split(' ').map(Number)

// ----------------------------------------------------
list.sort((a, b) => a - b)

let f = Infinity
let answer = ''
let left = 0, right = N - 1, mid = left + 1

while (left < N - 2) {
  right = N - 1
  mid = left + 1
  
  while (mid < right) {
    let sum = list[left] + list[mid] + list[right]
    const a = Math.abs(sum)

    if (a < f) {
      answer = `${list[left]} ${list[mid]} ${list[right]}`
      f = a
    }

    if (sum > 0) {
      right--
    }
    else if (sum < 0) mid++
    else if (sum === 0) return console.log(answer)
  }

  left++
}

console.log(answer)
