const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const orders = input.pop().split('').map(Number)

let list = input.map(l => l.split(''))
let move = 1

const dir = [[0,0],[1, -1],[1,0],[1,1],[0,-1],[0,0],[0,1],[-1,-1],[-1,0],[-1,1]]
let my = {
  x: 0,
  y: 0
}
const set = new Set()
let mad = new Set()


for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 'I') {
      my.x = i*1
      my.y = j*1
    }
    else if (list[i][j] === 'R') {
      const key = `${i},${j}`
      mad.add(key)
    }
  }
}

const moveJS = ([x, y]) => {
  my.x += x
  my.y += y
}

const movePoint = (r1, c1, r2, c2) => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2)
}

const moveArduino = () => {
  set.clear()
  const counter = Array.from({ length: N }, () => new Array(M).fill(0))
  for (let key of mad) {

    const [i, j] = key.split(',')
    let curPoint = movePoint(my.x, my.y, i, j)
    let nextPos = [i, j]

    for (let [x, y] of dir) {
      const dx = i * 1 + x
      const dy = j * 1 + y

      const nextMovePoint = movePoint(my.x, my.y, dx, dy)
      
      if (curPoint >= nextMovePoint) {
        curPoint = nextMovePoint
        nextPos = [dx, dy]
      }
    }
    
    // set.add(nextKey)
    counter[nextPos[0]][nextPos[1]] += 1
  }
  mad.clear()
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const key = `${i},${j}`
      if (counter[i][j] == 1) {
        mad.add(key)
      }
      if (counter[i][j] >= 1) set.add(key)
    }
  }

}

const searchJS = () => {
  for (let key of set) {
    const [i, j] = key.split(',')
    if (i == my.x && j == my.y) return true
  }
  return false
}

const clearList = () => {
  list = Array.from({length: N}, () => new Array(M).fill('.'))
}
const makeList = () => {
  list[my.x][my.y] = 'I'
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const key = `${i},${j}`
      if (mad.has(key)) list[i][j] = 'R'
    }
  }
}

for (let i in orders) {
  
  const char = orders[i]
  // 1. JS 움직이기
  moveJS(dir[char])

  // 2. mad한테 걸렷나 확인
  if (list[my.x][my.y] === 'R') return console.log(`kraj ${i * 1 + 1}`)
  
  // 3. mad움직이기
  moveArduino()

  // 4. mad가 JS잡앗나 확인, 5. 겹치는 거 무시
  const res = searchJS()
  if (res) return console.log(`kraj ${i*1+1}`)

  // 데이터 넣기
  clearList()
  makeList()

}

let answer = ''
list.forEach(arr => answer += arr.join('') + '\n')
console.log(answer.trim())