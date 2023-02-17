const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");


const TC = +input.shift()
let answer = ''
input.push('')
let j = 0;
// 최대 8개
for (let i = 0; i < TC; i++) {
  const list = []
  while (input[j] !== '') {
    list.push(input[j].split(''))
    j++
  }
  
  const str = solution(list)
  answer += str + '\n'
  j++
}
console.log(answer.trim())
// ----------------------------------------------------

function solution(list) {
  const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const isVal = (x, y) => x >= 0 && x < 5 && y >= 0 && y < 9
  let move = 0


  let pin = 0
  for (let i in list) {
    for (let j in list[i]) {
      if (list[i][j] === 'o') {
        pin += 1
      }
    }
  }

  let remainPin = pin
  for (let i in list) {
    for (let j in list[i]) {
      if (list[i][j] === 'o') {
        helper(i * 1, j * 1, 0, pin)
      }
    }
  }

  return `${remainPin} ${move}`

  function helper(i, j, count, remain) {
    if (remain <= remainPin) {
      remainPin = remain
      move = count
    }    

    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (isVal(dx, dy) && list[dx][dy] === 'o') {
        const nextX = dx + x
        const nextY = dy + y
        // console.log(i, j, dx, dy, nextX, nextY)
        if (isVal(nextX, nextY) && list[nextX][nextY] === '.') {
          list[i][j] = '.'
          list[dx][dy] = '.'
          list[nextX][nextY] = 'o'

          for (let a in list) {
            for (let b in list[a]) {
              if (list[a][b] === 'o') helper(a*1, b*1, count + 1, remain-1)
            }
          }

          list[i][j] = 'o'
          list[dx][dy] = 'o'
          list[nextX][nextY] = '.'
        }
      }
    }
  }
}