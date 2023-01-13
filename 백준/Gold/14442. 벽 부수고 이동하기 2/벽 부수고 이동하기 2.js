const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split('').map(Number))
// ------------------
const dir = [[1,0],[0,1],[-1,0],[0,-1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

// k === 점프 횟수
const visited = Array.from({ length: N }, () => new Array(M).fill(0).map(() => new Array(K+1).fill(0)))

let q = [[0, 0, 0, 1]]
while (q.length) {
  const temp = []

  for (let [i, j, k, t] of q) {
    // 도착!
    if (i === N - 1 && j === M - 1) {
      console.log(t)
      return;
    }

    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (isVal(dx, dy)) {
        // 벽이라면?
        if (list[dx][dy] === 1 && k < K && visited[dx][dy][k+1] === 0) {
          visited[dx][dy][k + 1] = visited[dx][dy][k] + 1
          temp.push([dx, dy, k + 1, t+1])
        }
        // 벽이 아니라면
        else if (list[dx][dy] === 0 && visited[dx][dy][k] === 0) {
          visited[dx][dy][k] = visited[dx][dy][k] + 1
          temp.push([dx, dy, k, t+1])
        }
      }
    }

  }
  q = temp
}

console.log(-1)
