const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, T] = input.shift().split(' ').map(Number)
let list = input.map(l => l.split(' ').map(Number))


const solution = () => {


  const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M;
  const visited = Array.from({ length: 2 }, () => Array.from({ length: N }, () => new Array(M).fill(false)))
  
  let q = [[0, 0, 0, 0]], t = 0
  visited[0][0][0] = true

  while (q.length && t <= T) {
    const temp = []

    for (let [i, j, level, has] of q) {
      if (i === N -1 && j === M - 1) return console.log(t)
        
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y

        if (isVal(dx, dy) && !visited[level][dx][dy]) {
          visited[level][dx][dy] = true
          
          // 검을 가지고 있거나, 검이 위치한 곳이라면, 이동 가능
          if (has || list[dx][dy] === 2) {
            temp.push([dx, dy, 1, 1])
          }

          // 벽이 아니라면 이동 가능.
          if (list[dx][dy] !== 1) {
            temp.push([dx, dy, level, has])
          }
        }
      }
    }

    t += 1
    q = temp
  }

  return console.log("Fail")
}

solution()
