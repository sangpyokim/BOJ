const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input
let answer = ''

for (let x of list) {
  helper(x)
}

console.log(answer.trim())

function helper(word) {
  const wordArr = new Array(26).fill(0)
  const len = word.length

  for (let char of word) {
    const i = char.charCodeAt(0) - 97
    wordArr[i] += 1
  }

  backtrack(0, '')
  function backtrack(L, str) {
    if (L === len) {
      answer += str + '\n'
      return
    }

    for (let i = 0; i < 26; i++) {
      if (wordArr[i]) {
        wordArr[i] -= 1
        backtrack(L + 1, str + String.fromCharCode(97 + i))
        wordArr[i] += 1
      }
    }
  }
}
