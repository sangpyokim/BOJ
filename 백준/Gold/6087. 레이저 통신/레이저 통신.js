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

const [M, N] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(''))


// 거울을 몇번 사용햇냐
// ------------------

const dir = [[-1,0], [0,1], [1,0], [0,-1]] // 상 우 하 좌
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M
const dist = Array.from({ length: N }, () => new Array(M).fill(Infinity))
const pq = new PriorityQueue()

let start = []
let target = []
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 'C') {
      if (start.length > 0) target = [i * 1, j * 1]
      else start = [i*1, j*1, -1]
    }
  }
}

pq.enqueue(0, start)
dist[start[0]][start[1]] = 0

while (pq.arr.length) {
  const cur = pq.dequeue()
  const curWeight = cur.weight
  const [i, j, direction] = cur.val

  if (dist[i][j] < curWeight) continue



  for (let d in dir) {
    const [x, y] = dir[d]
    const dx = i + x
    const dy = j + y

    if (isVal(dx, dy) && list[dx][dy] !== '*') {
      if (direction === -1) {
        dist[dx][dy] = Math.min(dist[dx][dy], curWeight)
        pq.enqueue(curWeight, [dx, dy, d])
      } else if (direction === d) {
        dist[dx][dy] = Math.min(dist[dx][dy], curWeight)
        pq.enqueue(curWeight, [dx, dy, d])
      } else if (direction !== d && dist[dx][dy] > curWeight+1){
        dist[dx][dy] = curWeight+1
        pq.enqueue(curWeight + 1, [dx, dy, d])
      }

    }
  }
}
console.log(dist[target[0]][target[1]])