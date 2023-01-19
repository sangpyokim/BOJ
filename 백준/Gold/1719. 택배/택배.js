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

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))


// 거울을 몇번 사용햇냐
// ------------------

const dir = [[-1,0], [0,1], [1,0], [0,-1]] // 상 우 하 좌
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M
const pq = new PriorityQueue()


const dist = Array.from({ length: N+1 }, () => new Array(N+1).fill(Infinity))
const map = Array.from({ length: N + 1 }, () => Array.from({length: N+1}, (v, i) => i))

for (let [x, y, w] of list) {
  dist[x][y] = Math.min(dist[x][y], w)

  dist[y][x] = Math.min(dist[y][x], w)

}

for (let i = 1; i <= N; i++) {
  dist[i][i] = 0
  map[i][i] = '-'
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      const sum = dist[i][k] + dist[k][j]
      if (dist[i][j] > sum) {
        dist[i][j] = sum
        map[i][j] = map[i][k]
      }

    }
  }
}
let answer = ''

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {    
    answer += String(map[i][j]) + ' '
  }
  answer += '\n'
}

console.log(answer.trim())