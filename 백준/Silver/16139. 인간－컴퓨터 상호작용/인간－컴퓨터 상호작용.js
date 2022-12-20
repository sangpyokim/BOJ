let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const str = input.shift()
const N = input.shift()
const lists = input.map(l => l.split(' '))
const len = str.length

const table = Array.from({ length: len }, () => new Array(27).fill(0))
const index = str.charCodeAt(0) - 97
table[0][index] = 1

for (let i = 1; i < len; i++) {
  const charIndex = str.charCodeAt(i) - 97
  for (let j = 0; j < 26; j++) {
    table[i][j] = table[i-1][j]
  }
  table[i][charIndex] += 1
}

let res = ''
for (let [char, start, end] of lists) {
  const charIndex = char.charCodeAt(0) - 97
  let a = 0
  if (table[start-1]) a = table[start-1][charIndex]

  const b = table[end][charIndex]
  res += b-a + '\n'
}
console.log(res.trim())
