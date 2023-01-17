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

    while (index > 0) {
      const parIndex = index >>> 1
      const par = this.arr[index]

      if (par.weight <= newNode.weight) break;

      [this.arr[parIndex], this.arr[index]] = [newNode, par]

      index = parIndex
    }
  }

  dequeue() {
    const max = this.arr[0]
    const end = this.arr.pop()
    const len = this.arr.length

    if (len === 0) return max || null
    
    // 내려가기
    this.arr[0] = end
    let index = 0
    const elem = this.arr[index]

    while (1) {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = 2 * index + 2
      let leftChild = null
      let rightChild = null
      let swap = null

      // 왼쪽자식
      if (leftChildIndex < len) {
        leftChild = this.arr[leftChildIndex]
        // 왼쪽 자식이 top보다 더 커버리면 swap에 임시저장
        if (leftChild.weight < elem.weight) {
          swap = leftChildIndex
        }
      }

      // 오른쪽자식
      if (rightChildIndex < len) {
        rightChild = this.arr[rightChildIndex]
        // 오른쪽자식이 top보다 크고, 왼쪽자식보다 크면 swap을 변경 시켜줌
        if (rightChild.weight < elem.weight && rightChild.weight < leftChild.weight) {
          swap = rightChildIndex
        }
      }

      if (swap === null) break;

      [this.arr[index], this.arr[swap]] = [this.arr[swap], elem]
      index = swap
    }

    return max
  }

}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let index = 0
let answerIndex = 1
while (true) {
  const N = +input[index]
  index += 1

  if (N === 0) break;

  const list = input.slice(index, index + N).map(l => l.split(' ').map(Number))
  index += N

  const res = solution(N, list)
  console.log(`Problem ${answerIndex}: ${res}`)
  answerIndex += 1
}

// ------------------

function solution(N, list) {
  const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
  const dist = Array.from({length: N}, () => new Array(N).fill(Infinity))
  const pq = new PriorityQueue()

  const startWeight = list[0][0]

  dist[0][0] = startWeight
  pq.enqueue(startWeight, [0, 0])
  let res = Infinity
  while (pq.arr.length) {
    const cur = pq.dequeue()
    const curWeight = cur.weight
    const [i, j] = cur.val
    
    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (isVal(dx, dy)) {
        const nextWeight = list[dx][dy]
        const sumWeight = curWeight + nextWeight
        if (dist[dx][dy] > sumWeight) {
          dist[dx][dy] = sumWeight
          pq.enqueue(sumWeight, [dx, dy])
        }
      }
    }

    res = dist[N-1][N-1]
  }
  return res
}


