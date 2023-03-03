const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(''))
// ------------------------------------------------
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col

let answer = 0
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (list[i][j] === 'L') answer = Math.max(answer,  bfs(i, j))
  }
}

function bfs(a, b) {
  const visited = Array.from({ length: row }, () => new Array(col).fill(false))
  visited[a][b] = true
  let q = [[a, b]]
  let time = 0
  while (q.length) {
    const temp = []
    
    for (let [i, j] of q) {
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
  
        if (isVal(dx, dy) && !visited[dx][dy] && list[dx][dy] === 'L') {
          visited[dx][dy] = true
          temp.push([dx,dy])
        }
      }
    }
    if (temp.length === 0) return time
    time += 1
    q = temp
  }
}


console.log(answer)