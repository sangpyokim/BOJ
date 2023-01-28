const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()

let res = ''


for (let i = 0; i < TC; i++) {
  const [N, M] = input.shift().split(' ').map(Number)
  const list = []
  for (let j = 0; j < N; j++) {
    list.push(input.shift().split(''))
  }
  const r = solution(N, M, list)
  res += r + '\n'
}
console.log(res.trim())

// ----------------------------
// 각 리프노드의 레벨 수를 더해서 홀수면 이김.
function solution(row, col, list) {
  const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col
  const visited = Array.from({ length: row }, () => new Array(col).fill(false))
  let answer = 0
  for (let i = 0; i < row; i++) { 
    for (let j = 0; j < col; j++) {
      if (!visited[i][j] && list[i][j] === '#') {
        answer += 1
        bfs(i, j)
      }
    }
  }

  function bfs(a, b) {
    let q = [[a, b]]
    while (q.length) {
      const temp = []

      for (let [i, j] of q) {
        if (visited[i][j]) continue
        visited[i][j] = true

        for (let [x, y] of dir) {
          const dx = i + x
          const dy = j + y
          if (isVal(dx, dy) && list[dx][dy] === '#') {
            temp.push([dx, dy])
          }
        }
      }

      q = temp
    }
  }


  return answer
}