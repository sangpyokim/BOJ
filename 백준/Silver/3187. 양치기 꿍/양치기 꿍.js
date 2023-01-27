const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(''))
// ----------------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M
const visited = Array.from({ length: N }, () => new Array(M).fill(false))

let v = 0
let k = 0

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (list[i][j] !== '#' && !visited[i][j]) bfs(i, j)
  }
}
console.log(`${k} ${v}`)

function bfs(x, y) {
  let q = [[x, y]]
  let count = [0, 0]
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (visited[i][j]) continue
      visited[i][j] = true

      if (list[i][j] === 'v') count[0]++
      else if (list[i][j] === 'k') count[1]++

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && list[dx][dy] !== '#') {
          temp.push([dx, dy])
        }
      }
    }

    q = temp
  }
  if (count[1] > count[0]) k += count[1]
  else v += count[0]
}