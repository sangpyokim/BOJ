const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(''))
// ------------------------------------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col
const visited = Array.from({length: row}, () => new Array(col).fill(false))
let time = 1, q = [];


for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (list[i][j] === 'S') q.push([i, j, 'S'])
  }
}

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (list[i][j] === '*') q.push([i, j, '*'])
  }
}


while (q.length) {
  const temp = []

  for (let [i, j, char] of q) {
    if (char === 'S' && list[i][j] === '*') continue


    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      
      if (char === 'S' && isVal(dx, dy) && (list[dx][dy] === '.' || list[dx][dy] === 'D') ) {
        if (list[dx][dy] === 'D') return console.log(time)
        list[i][j] = '.'
        list[dx][dy] = 'S'
        temp.push([dx,dy,char])
      }
      if (char === '*' && isVal(dx, dy) && list[dx][dy] !== 'D' && (list[dx][dy] === '.' || list[dx][dy] === 'S') ) {
        list[dx][dy] = '*'
        temp.push([dx,dy,char])
      }
    }
  }
  
  time += 1
  q = temp
}

console.log('KAKTUS')