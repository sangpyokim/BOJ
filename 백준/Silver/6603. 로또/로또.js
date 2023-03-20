const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let answer = ''
while (true) {
  const list = input.shift().split(' ').map(Number)
  const N = list.shift()
  if (N === 0) break;
  
  const res = solution(N, list)
  answer += res + '\n'
}
console.log(answer.trim())

function solution(N, list) {
  let res = ''
  helper(0, 0, [])

  function helper(L, index, arr) {
    if (L === 6) {
      res += arr.join(' ')+'\n'
      return
    }
    for (let i = index; i < N; i++) {
      helper(L+1, i+1, [...arr, list[i]])
    }
  }

  return res
}