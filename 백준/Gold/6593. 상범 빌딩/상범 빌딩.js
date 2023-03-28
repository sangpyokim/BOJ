const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");



while (true) {
  const [L, R, C] = input.shift().split(' ')
  if (L == 0) break;
  

  let list = []

  for (let l = 0; l < L; l++) {
    const temp = []

    for (let i = 0; i < R; i++) {
      const line = input.shift().split('')
      temp.push(line)
    }

    list.push(temp)
    input.shift()
  }
  

  const res = solution(list, L, R, C)
  console.log(res)
}  

function solution(list, l, r, c) {
  const dir = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]]
  const isVal = (x, y, z) => x >= 0 && x < l && y >= 0 && y < r && z >= 0 && z < c
  
  let time = 0, q = [], start, target

  for (let i in list) {
    for (let j in list[i]) {
      for (let k in list[i][j]) {
        if (list[i][j][k] === 'S') start = [i*1, j*1, k*1]
        if (list[i][j][k] === 'E') target = [i*1, j*1, k*1]
      }
    }
  }
  q.push(start)
  list[start[0]][start[1]][start[2]] = '#'

  while (q.length) {
    const temp = []

    for (let [l, i, j] of q) {
      if (l === target[0] && i === target[1] && j === target[2]) return `Escaped in ${time} minute(s).`
        
      for (let [x, y, z] of dir) {
        const dx = l + x
        const dy = i + y
        const dz = j + z
        if (isVal(dx, dy, dz) && (list[dx][dy][dz] === '.' || list[dx][dy][dz] === 'E')) {
          list[dx][dy][dz] = '#'
          temp.push([dx, dy, dz])
        }
      }
    }

    time += 1
    q = temp
  }

  return "Trapped!"
}
