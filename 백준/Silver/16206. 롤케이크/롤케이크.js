const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number)
const list = input.shift().split(' ').map(Number)
let answer = 0

const list1 = [], list2 = []

for (let x of list) {
  if (x % 10 === 0) list1.push(x)
  else list2.push(x)
}

list1.sort((a,b) => b-a)
list2.sort((a,b) => a-b)

while (list1.length) {
  let cur = list1.pop() // min

  while (cur > 10 && M > 0) {
    cur -= 10
    M -= 1
    answer += 1
  }

  if (cur === 10) answer += 1
}

while (list2.length) {
  let cur = list2.pop() // min

  while (cur > 10 && M > 0) {
    cur -= 10
    M -= 1
    answer += 1
  }

  if (cur === 10) answer += 1
}

console.log(answer)