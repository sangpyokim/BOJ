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

    // 올라가기
    let index = this.arr.length - 1
    
    while (index > 0) {
      // 부모의 인덱스는 자식 인덱스의 절반. (소수점 버림)
      const parIndex = (index - 1) >>> 1
      const par = this.arr[parIndex]
      // 부모의 가중치보다 자식의 가중치가 더 크면 스왑 중지
      if (newNode.weight >= par.weight) break;

      // 스왑
      [this.arr[parIndex], this.arr[index]] = [newNode, par]
      
      // 자식인덱스 변경
      index = parIndex
    }
  }

   dequeue() {
    const result = this.arr[0]
    const end = this.arr.pop()
    const len = this.arr.length

    if (len === 0) return result || null
    
    // 내려가기
    this.arr[0] = end
    let curIndex = 0
    const cur = this.arr[curIndex]

    while (true) {
      const leftChildIndex = curIndex*2 + 1  
      const rightChildIndex = curIndex * 2 + 2
      let swap = null

      if (rightChildIndex >= len) break;

      const leftChild = this.arr[leftChildIndex]
      if (leftChild.weight < cur.weight) swap = leftChildIndex

      const rightChild = this.arr[rightChildIndex]
      if (rightChild.weight < cur.weight && rightChild.weight < leftChild.weight) swap = rightChildIndex

      if (!swap) break

      [this.arr[swap], this.arr[curIndex]] = [cur, this.arr[swap]]
      
      curIndex = swap
    }

    return result
  }
  

}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");


const [M, N] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split('').map(Number))

// ------------------
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

const dist = Array.from({length: N}, () => new Array(M).fill(Infinity))
const pq = new PriorityQueue()

dist[0][0] = 0
pq.enqueue(0, [0, 0])


while (pq.arr.length) {
  const cur = pq.dequeue()
  const curWeight = cur.weight
  const [i, j] = cur.val

  if (i === N-1 && j === M-1) return console.log(curWeight)

  if (dist[i][j] > curWeight) continue

  for (let [x, y] of dir) {
    const dx = i + x
    const dy = j + y

    if (isVal(dx, dy) && dist[dx][dy] > curWeight) {
      if (list[dx][dy] === 1) pq.enqueue(curWeight + 1, [dx, dy])
      else pq.enqueue(curWeight, [dx, dy])

      dist[dx][dy] = curWeight
    }
  }
}

