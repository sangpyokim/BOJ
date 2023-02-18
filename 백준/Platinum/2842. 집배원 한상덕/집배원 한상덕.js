const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift();
const list = input.splice(0, N).map(l => l.split(''))
let Altitude = input.map(l => l.split(' ').map(Number))

// ------------------------------------------------
// 주어진 고도로 탐모든 k를 탐색가능한지..!
// k의 개수, limitAl, 이분탐색

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
let start = []
let K = 0
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
let arr = []

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (list[i][j] === 'K') K += 1
    if (list[i][j] === 'P') start = [i * 1, j * 1]
    arr.push(Altitude[i][j])
  }
}

const temp = new Set(arr)
arr = [...temp]
arr.sort((a, b) => a - b)

// two pointer
const len = arr.length
let answer = Infinity, l = 0, r = 0

while (r < len) {
  let res = false

  if (arr[l] <= Altitude[start[0]][start[1]] && Altitude[start[0]][start[1]] <= arr[r]) { 
    res = bfs(arr[l], arr[r])
  }
  // bfs돌려지면 값 갱신
  if (res) {
    answer = Math.min(answer, arr[r] - arr[l])
    l++
  } else r++
}

console.log(answer)

function bfs(left, right) {
  // left, right 안에 있는 고도만 통과해서 모든 집을 갈수잇나.
  const visited = Array.from({length: N}, () => new Array(N).fill(false))
  let q = [start]

  visited[start[0]][start[1]] = true
  let count = 0

  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (list[i][j] === 'K') count += 1
      if (count === K) return true

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && !visited[dx][dy] && left <= Altitude[dx][dy] && Altitude[dx][dy] <= right) {
          visited[dx][dy] = true
          temp.push([dx,dy])
        } 
      }
    }

    q = temp
  }
  return false
}