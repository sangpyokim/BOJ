const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

const dir = [[1,0],[0,1],[-1,0],[0,-1]]
const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col

let prev = 0, time = 0
while (true) {
  const round = bfs()
  if (round.length === 0) {
    console.log(time)
    console.log(prev)
    return
  }

  for (let [x, y] of round) {
    list[x][y] = 0
  }

  time += 1
  prev = round.length
}

// 0,0에서 bfs하고 치즈를 만나면 따로 저장
function bfs() {
  const round = []
  let q = [[0, 0]]
  const visited = Array.from({ length: row }, () => new Array(col).fill(false))
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (visited[i][j]) continue
      visited[i][j] = true

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy)) {
          if (list[dx][dy] === 1 && !visited[dx][dy]) {
            visited[dx][dy] = true
            round.push([dx, dy])
          } else {
            temp.push([dx, dy])
          }
        }
      }
    }
    q = temp
  }
  return round
}