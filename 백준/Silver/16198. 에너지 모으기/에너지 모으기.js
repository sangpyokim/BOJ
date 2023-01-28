const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input[0].split(' ').map(Number)
// ----------------------------
let answer = 0
helper(0, list, 0)
console.log(answer)

function helper(L, arr, sum) {
  answer = Math.max(answer, sum)
  // arr에서 하나 뽑고 계산하고 
  const len = arr.length

  for (let i = 0; i < len; i++) {
    if (i === 0 || i === len - 1) continue
    
    const prev = arr[i - 1] || 1
    const next = arr[i + 1] || 1
    const sumScore = prev * next
    const popArr = pop(arr, i) // 2.
    helper(L+1, popArr, sum + sumScore)
  }
}

function pop(arr, index) {
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (i !== index) res.push(arr[i])
  }
  return res
}