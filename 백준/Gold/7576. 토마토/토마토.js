let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');

// first line
let first = input[0].split(" ").map(Number);
// others line
let A = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== '') {
    A.push(input[i].split(' '));
  }
}
for (let i in A) {
  A[i] = A[i].toString().split(',')
}
// -------------------------------------------------------- //
const row = A.length
const col = A[0].length
const dir = [[1,0],[0,1],[-1,0],[0,-1]]
const answer = Array.from({ length: row }, () => new Array(col).fill(Infinity))

let q = []

for (let i in A) {
  for (let j in A[0]) {
    if (A[i][j] == 1) {
      q.push([i * 1, j * 1])
    } else if (A[i][j] == -1) {
      answer[i][j] = 10001
    }
  }
}

let time = 0
while (q.length) {
  const temp = []
  
  for (let [i, j] of q) {
    if (answer[i][j] === 10001) continue
    if (answer[i][j] <= time) continue
    else if (answer[i][j] > time) {
      answer[i][j] = time
    } 

    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (dx >= 0 && dx < row && dy >= 0 && dy < col && answer[dx][dy] > time) {
        temp.push([dx, dy])
      }
    }
  }
  time += 1
  q = temp
}



let res = 0
for (let i in answer) {
  for (let j in answer[i]) {
    if (answer[i][j] !== Infinity && answer[i][j] !== 10001) res = Math.max(res, answer[i][j])
    if (answer[i][j] === Infinity) return console.log(-1)
  }
}
console.log(res)
