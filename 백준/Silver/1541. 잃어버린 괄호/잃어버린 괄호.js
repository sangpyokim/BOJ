let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = input.shift()

const list = N.split('-')
let res = 0
const nums = []

for (let x of list) {
  const num = x.split('+')
  const sum = num.reduce((a, b) => a*1 + b*1)
  nums.push(sum*1)
}

res = nums.shift()

for (let x of nums) {
  res -= x
}

console.log(res)
