const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))
// ------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
const arr = [] // 해안선
let color = 2
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 1) {
      arr[color] = new Set()
      dfs(i*1, j*1, color)
      color += 1
    } 
  }
}

let answer = Infinity
// 해안선에서부터 다른 대륙의 최단거리 찾기
for (let i = 2; i < arr.length; i++) {
  const dist = bfs(arr[i], i)
  answer = Math.min(answer, dist)
}
console.log(answer)

function bfs(set, cur) {
  const visited = Array.from({ length: N }, () => new Array(N).fill(false))
  let q = []
  for (let key of set) {
    const [x, y] = key.split(',')
    q.push([x*1, y*1])
  }
  
  let dist = 0
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (visited[i][j]) continue
      visited[i][j] = true

      if (list[i][j] !== 0 && list[i][j] !== cur) return dist-1

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && list[dx][dy] !== cur) temp.push([dx, dy])
      }

    }

    dist += 1
    q = temp
  }

}

// 색칠하기
function dfs(i, j, color) {
  if (list[i][j] === 0) return
  list[i][j] = color

  for (let [x, y] of dir) {
    const dx = i + x
    const dy = j + y
    if (isVal(dx, dy)) {
      // 근처가 물가라면 해안선에 추가
      if (list[dx][dy] === 0) arr[color].add(`${i},${j}`)
      if (list[dx][dy] !== color) dfs(dx, dy, color)
    }
  }
}
