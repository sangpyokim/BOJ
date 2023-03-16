const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift()
const list = input.shift()
let answer = 0


const a = aa('R')
const b = aa('B')
const c = Raa('R')
const d = Raa('B')

console.log(Math.min(a,b,c,d))

function aa(type) {
  let temp = 0, stack = []

  for (let char of list) {
    if (char === type) {
      stack.push(type)
    }
    if (char !== type) {
      temp += stack.length
      stack = []
    }
  }

  return temp
}
function Raa(type) {
  let temp = 0, stack = []

  for (let i = N - 1; i >= 0; i--) {
    const char = list[i]
    if (char === type) {
      stack.push(type)
    }
    if (char !== type) {
      temp += stack.length
      stack = []
    }
  }

  return temp
}
