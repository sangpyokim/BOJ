const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");


const [N, M] = input.shift().split(' ').map(Number)
const list = input.splice(0, N).map(l => l.split('').map(Number))

// ------------------
const dir = [[1,0], [0,1], [-1,0], [0,-1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M
const arr = []
let color = 2
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 0) {
      bfs(i * 1, j * 1, color) 
      color += 1
    }
  }
}

let answer = ''
for (let i in list) {
  let str = ''

  for (let j in list[i]) {
    if (list[i][j] === 1) {
      let sum = 1
      const set = new Set()
      for (let [x, y] of dir) {
        const dx = i * 1 + x
        const dy = j * 1 + y

        if (isVal(dx, dy) && list[dx][dy] >= 2 && !set.has(list[dx][dy])) {

          set.add(list[dx][dy])
          const number = arr[list[dx][dy]]
        
          sum += number
        }
      }
      str += String(sum % 10)
    } else {
      str += '0'
    }
  }

  answer += str + '\n'
}

console.log(answer.trim())


function bfs(a, b, index) {
  const set = new Set()
  set.add(`${a},${b}`)
  let q = [[a,b]]
  let amount = 0
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      list[i][j] = index
      amount += 1
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        const key = `${dx},${dy}`
        if (isVal(dx, dy) && list[dx][dy] === 0 && !set.has(key)) {
          set.add(key)
          temp.push([dx, dy])
        }
      }
    }
    q = temp
  }
  arr[index] = amount
}