class Node {
  constructor(weight, val) {
    this.weight = weight
    this.val = val
  }
}
class PriorityQueue {
  constructor() {
    this.arr = []
  }

  enqueue(weight, val) {
    const newNode = new Node(weight, val)
    this.arr.push(newNode)

    let index = this.arr.length-1
    // 부모보다 작으면 바꾸기
    while (true) {
      const parIndex = index >>> 1
      const par = this.arr[parIndex]
      if (par.weight <= newNode.weight) break;

      [this.arr[parIndex], this.arr[index]] = [newNode, par]

      index = parIndex
    }
  }

  dequeue() {
    const res = this.arr[0]
    const tail = this.arr.pop()
    const len = this.arr.length

    if (len === 0) return res

    this.arr[0] = tail
    let index = 0
    const cur = this.arr[index]

    while (true) {
      const leftChildIndex = index * 2 + 1
      const rightChildIndex = index * 2 + 2

      if (rightChildIndex >= len) break;

      let leftChild = this.arr[leftChildIndex]
      let rightChild = this.arr[rightChildIndex]
      let swap = null


      if (leftChild.weight < cur.weight) {
        swap = leftChildIndex
      }

      if (rightChild.weight < cur.weight && rightChild.weight < leftChild.weight) {
        swap = rightChildIndex
      }

      if (!swap) break;

      [ this.arr[index], this.arr[swap] ] = [this.arr[swap], cur]
      index = swap
    }

    return res
  }

}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(''))


// 거울을 몇번 사용햇냐
// ------------------
let answer = 0

const dir = [[-1,0], [1,0], [0,-1], [0,1]] // 상 하 좌 우
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
const dist = Array.from({ length: N }, () => new Array(N).fill(0).map(() => new Array(4).fill(Infinity)))

const arr = []
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === '#') arr.push([i*1, j*1])
  }
}
let q = []
const [sx, sy] = arr.shift()
for (let i = 0; i < 4; i++) {
  dist[sx][sy][i] = 0
  q.push([sx, sy, i])
}
// list[sx][sy] = '!'
while (q.length) {
  const temp = []

  for (let [i, j, d] of q) {
    const [x, y] = dir[d]
    const dx = i + x
    const dy = j + y
    // console.log(dx, dy)

    if (!isVal(dx, dy) || list[dx][dy] === '*') continue

    // console.log(dx, dy)

    if (list[dx][dy] === '.') {
      if (dist[dx][dy][d] > dist[i][j][d]) dist[dx][dy][d] = dist[i][j][d]
      temp.push([dx, dy, d])
    }
    else if (list[dx][dy] === '!') {
      if (dist[dx][dy][d] > dist[i][j][d]) {
        dist[dx][dy][d] = dist[i][j][d]
        temp.push([dx, dy, d])
      }

      let change_dir = []
      if (d === 0 || d === 1) {
        change_dir[0] = 2
        change_dir[1] = 3
      } else {
        change_dir[0] = 0
        change_dir[1] = 1
      }
      
      for (let k = 0; k < 2; k++) {
        if (dist[dx][dy][change_dir[k]] > dist[i][j][d] + 1) {
          dist[dx][dy][change_dir[k]] = dist[i][j][d] + 1
          temp.push([dx, dy, change_dir[k]])
        }
      }


    } else {
      if (dist[dx][dy][d] > dist[i][j][d]) dist[dx][dy][d] = dist[i][j][d]
    }

  }

  q = temp
}

const res = dist[arr[0][0]][arr[0][1]]
console.log(Math.min(...res))