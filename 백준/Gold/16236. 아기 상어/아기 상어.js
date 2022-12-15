class Shark {
  x
  y
  size = 2 
  exp = 0
  moveTime = 0
  constructor(i, j) {
    this.x = i
    this.y = j
  }


  move(i, j, t) {
    this.x = i
    this.y = j
    this.moveTime += t
  }
  eatFish() {
    this.exp += 1
    if (this.canSizeUp()) {
      this.sizeUp()
      this.exp = 0
    }
  }
  sizeUp() {
    this.size += 1
  }
  canSizeUp() {
    return this.size === this.exp
  }
}

let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift()
const matrix = input.map(l => l.split(' ').map(Number))
const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]

let shark

for (let i in matrix) {
  for (let j in matrix[i]) {
    if (matrix[i][j] === 9) {
      shark = new Shark(i*1, j*1)
      matrix[i][j] = 0
    }
  }
}

function bfs() {
  let q = [[shark.x, shark.y]]
  let time = 0
  const visited = Array.from({ length: N }, () => new Array(N).fill(false))
  const fishes = []
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (visited[i][j]) continue
      visited[i][j] = true

      // 먹을 수 있나?
      if (matrix[i][j] < shark.size && matrix[i][j] !== 0) {
        fishes.push([i, j, time])
      }

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        // 이동할 수 있나?
        if (dx >= 0 && dx < N && dy >= 0 && dy < N && matrix[dx][dy] <= shark.size) {
          temp.push([dx, dy])
        }
      }
    }

    if (fishes.length) return fishes
    time += 1
    q = temp
  }
  return false
}
while (true) {
  let arr = bfs()
  // console.log(arr, shark)
  if (!arr) return console.log(shark.moveTime)

  arr.sort((a,b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])
  const [i,j,t] = arr[0]

  shark.eatFish()
  shark.move(i, j, t)
  matrix[i][j] = 0
}
