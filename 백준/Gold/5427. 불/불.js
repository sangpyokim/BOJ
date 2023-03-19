const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()

for (let i = 0; i < TC; i++) {
  const [n, m] = input.shift().split(' ').map(Number)
  const l = input.splice(0, m).map(li => li.split(''))
  solution(m, n, l)
}

function solution(N, M, list) {
  const border = new Set()
  for (let i = 0; i < N; i++) {
    const key1 = `0,${i}`
    const key2 = `${N-1},${i}`
    border.add(key1)
    border.add(key2)
  }
  
  for (let i = 0; i < M; i++) {
    const key1 = `${i},0`
    const key2 = `${i},${M-1}`
    border.add(key1)
    border.add(key2)
  }
  
  const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const isVal = (x, y) => x >= 0 && x < N & y >= 0 && y < M
  const visited = Array.from({ length: N }, () => new Array(M).fill(false))
  const JCanMove = (dx, dy) => !visited[dx][dy] && list[dx][dy] === '.'
  const FCanMove = (dx, dy) => list[dx][dy] !== '*' && list[dx][dy] !== '#'
  
  let q1 = [], q2 = [], time = 1
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (list[i][j] === '@') {
        q1.push([i, j])
        list[i][j] = '.'
      }
      if (list[i][j] === '*') q2.push([i, j])
    }
  }
  
  
  while (q2.length || q1.length) {
    const temp1 = []
    const temp2 = []

    for (let [i, j] of q2) {
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && FCanMove(dx, dy)) {
          list[dx][dy] = '*'
          temp2.push([dx,dy])
        }
      }
    }

    let isJMove = false
    for (let [i, j] of q1) {
      const key = `${i},${j}`
      if (border.has(key)) return console.log(time)
      
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && JCanMove(dx,dy)) {
          visited[dx][dy] = true
          isJMove = true
          temp1.push([dx, dy])
        }
      }
    }
  
    if (!isJMove) return console.log('IMPOSSIBLE')
    time += 1
    q1 = temp1
    q2 = temp2
  }

}



