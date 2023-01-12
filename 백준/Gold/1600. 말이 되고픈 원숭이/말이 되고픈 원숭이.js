const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const K = +input.shift()
const [M, N] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))
// ------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const dir2 = [[-1,-2], [-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

// [N][M][K] => N,M에 점프를 k번사용함.
const visited = Array.from({ length: N }, () => new Array(M).fill(0).map(() => new Array(K+1).fill(false)))


let q = []
q.push([0, 0, 0, 0]);


function bfs() {
  while (q.length) {
    const temp = []

    for (let [i, j, t, time] of q) {
      // if (visited[i][j][t]) continue
      // visited[i][j][t] = true
      if (i === N - 1 && j === M - 1) return time

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && list[dx][dy] === 0 && !visited[dx][dy][t]) {
          visited[dx][dy][t] = true
          temp.push([dx, dy, t, time + 1])
        }
      }
      for (let [x, y] of dir2) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && list[dx][dy] === 0 && t < K && !visited[dx][dy][t+1]) {
          visited[dx][dy][t+1] = true
          temp.push([dx, dy, t + 1, time+1])
        }
      }
    }
    q = temp
  }

  return -1;
}

console.log(bfs())