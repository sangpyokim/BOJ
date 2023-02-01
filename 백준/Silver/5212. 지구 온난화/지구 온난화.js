const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(''))

// ----------------------------------------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col

let q = []

for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 'X') q.push([i*1, j*1])
  }
}
let q2 = []
for (let [i, j] of q) {
  let count = 0
  for (let [x, y] of dir) {
    const dx = i + x
    const dy = j + y
    if (!isVal(dx, dy) || list[dx][dy] === '.') {
      count += 1
    }
    if (count === 3) q2.push([i, j])
  }
}
for (let [i, j] of q2) {
  list[i][j] = '.'
}

const arr = []
for (let i = 0; i < row; i++) {
  let flag = true
  for (let j = 0; j < col;j++) {
    if (list[i][j] === 'X') flag = false
  }
  if (!flag) continue
  for (let j = 0; j < col; j++) {
    arr.push([i, j])
  }
}

for (let i = 0; i < col; i++) {
  let flag = true
  
  for (let j = 0; j < row; j++) {
    if (list[j][i] === 'X') flag = false
  }

  if (!flag) continue
  for (let j = 0; j < row; j++) {
    arr.push([j, i])
  }
}

for (let [i, j] of arr) {
  list[i][j] = '.'
}


  // 2개의 꼭짓점으로 직사각형 만들기.
let a = [0, Infinity], b = [Infinity, 0]
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 'X') {
      a[0] = Math.max(a[0], i)
      a[1] = Math.min(a[1], j)

      b[0] = Math.min(b[0], i)
      b[1] = Math.max(b[1], j)
    }
  }
}
let answer = ''

for (let i = Math.min(a[0], b[0]); i <= Math.max(a[0], b[0]); i++) {
  for (let j = Math.min(a[1], b[1]); j <= Math.max(a[1], b[1]); j++) {
    answer += list[i][j]
  }
  answer += '\n'
}



console.log(answer.trim())
