const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const K = +input.shift()
const apple = input.splice(0, K).map(l => l.split(' ').map(Number))
const L = +input.shift()
const listQ = input.splice(0, L).map(l => l.split(' '))

// ----------------------------------------------------
class Snake {
  constructor() {
    this.dir = 0 // 머리의 방향
    this.tail = [] // stack, 전 머리 저장
    this.tailSet = new Set() // 꼬리 접근
    this.head = `0,0` // key
  }
  
  getHeadDir() {
    return this.head.split(',').map(Number)
  }

  move(x, y) {
    const [i, j] = this.getHeadDir()

    const nextHeadDir = `${i + x},${j + y}`
    if (!this.canMove(nextHeadDir)) return false

    this.head = nextHeadDir
    return true
  }

  canMove(key) {
    if (this.tailSet.has(key)) return false
    return true
  }

  tailPush() {
    this.tail.push(this.head)
    this.tailSet.add(this.head)
  }

  tailPop() {
    const key = this.tail.shift()
    this.tailSet.delete(key)
  }
}


const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] // 우 하 좌 상
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N

const appleSet = new Set()
for (let [x, y] of apple) {
  const key = `${x-1},${y-1}`
  appleSet.add(key)
}

// 벽에 부딪히면 게임 종료
let time = 0
const snake = new Snake()

while (true) {
  // 방향에 맞는 위치로 이동시킴.
  // 사과 있는지 확인,
  // 있으면 길이 그대로
  // 없다면 꼬리 줄어듦
  const [x, y] = dir[snake.dir]
  snake.tailPush()
  if (!snake.move(x, y)) break;


  if (!appleSet.has(snake.head)) snake.tailPop()
  else appleSet.delete(snake.head)

  const [i, j] = snake.getHeadDir()
  if (!isVal(i, j)) break;
    
  time += 1

  if (listQ.length > 0 && listQ[0][0] == time) {
    const [times, direction] = listQ.shift()
    let a = (snake.dir + 4)
    if (direction === 'D') {
      a = (a+1) % 4
    } else {
      a = (a-1) % 4
    }

    snake.dir = a
  }
  // console.log(time, snake.getHeadDir(), snake.tail, snake.dir)

}


console.log(time+1)