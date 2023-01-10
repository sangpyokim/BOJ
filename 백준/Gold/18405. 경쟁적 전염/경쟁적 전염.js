const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number)
const [S, X, Y] = input.pop().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

let q = []
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] !== 0) q.push([list[i][j], i*1, j*1])
  }
}

q.sort((a, b) => a[0] - b[0])

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N

for (let i = 0; i < S; i++) {
  const temp = []
  for (let [k, i, j] of q) {
    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (isVal(dx, dy) && list[dx][dy] === 0) {
        list[dx][dy] = k
        temp.push([k, dx, dy])
      }
    }

  }
  temp.sort((a,b) => a[0] - b[0])
  q = temp
}

console.log(list[X-1][Y-1])