const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = input.shift()
const list = input.shift().split('').map(Number)
const list2 = list.map((v, i) => i === 0 || i === 1 ? 1-v : v)
const target = input.shift().split('').map(Number)


function solution(arr) {
  let count = 0
  
  for (let i = 1; i < N; i++) {
    if (arr[i - 1] !== target[i - 1]) {
      flip(i, arr)
      count += 1
    }
  }

  return count
}

const res1 = solution(list)
const res2 = solution(list2) + 1
let answer = Infinity
if (list.toString() === target.toString()) answer = Math.min(answer, res1)
if (list2.toString() === target.toString()) answer = Math.min(answer, res2)

if (answer === Infinity) return console.log(-1)
console.log(answer)

function flip(i, arr) {
  if (i === 0) {
    arr[i] = 1 - arr[i]
    arr[i+1] = 1 - arr[i+1]
  }
  else if (i === N - 1) {
    arr[i] = 1 - arr[i]
    arr[i-1] = 1 - arr[i-1]
  }
  else {
    arr[i-1] = 1 - arr[i-1]
    arr[i] = 1 - arr[i]
    arr[i+1] = 1 - arr[i+1]
  }
}
